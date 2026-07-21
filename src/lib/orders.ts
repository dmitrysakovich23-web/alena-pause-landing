import { ensureOrdersTable, getSql } from "@/lib/db";
import { getYookassaPayment } from "@/lib/yookassa";

export type OrderStatus = "pending" | "succeeded" | "canceled";

export type Order = {
  id: string;
  email: string;
  status: OrderStatus;
  amountValue: string;
  currency: string;
  yookassaPaymentId?: string | null;
  yookassaPaymentStatus?: string | null;
  confirmationUrl?: string | null;
};

type OrderRow = {
  id: string;
  email: string;
  status: OrderStatus;
  amount_value: string;
  currency: string;
  yookassa_payment_id: string | null;
  yookassa_payment_status: string | null;
  confirmation_url: string | null;
};

type PaymentSnapshot = {
  id: string;
  status: string;
  confirmationUrl: string;
  raw: unknown;
};

type YookassaPaymentSnapshot = Awaited<ReturnType<typeof getYookassaPayment>>;

export type SyncOrderPaymentResult =
  | {
      type: "not_found";
    }
  | {
      type: "verified";
      order: Order;
    };

function mapOrder(row: OrderRow): Order {
  return {
    id: row.id,
    email: row.email,
    status: row.status,
    amountValue: row.amount_value,
    currency: row.currency,
    yookassaPaymentId: row.yookassa_payment_id,
    yookassaPaymentStatus: row.yookassa_payment_status,
    confirmationUrl: row.confirmation_url,
  };
}

function mapPaymentStatus(status: string): OrderStatus {
  if (status === "succeeded") {
    return "succeeded";
  }

  if (status === "canceled") {
    return "canceled";
  }

  return "pending";
}

function getPaymentOrderId(payment: YookassaPaymentSnapshot) {
  return payment.metadata?.orderId || payment.metadata?.order_id || "";
}

function assertPaymentBelongsToOrder(order: Order, payment: YookassaPaymentSnapshot) {
  const paymentOrderId = getPaymentOrderId(payment);

  if (payment.id !== order.yookassaPaymentId) {
    throw new Error("Payment id does not match order.");
  }

  if (paymentOrderId !== order.id) {
    throw new Error("Payment metadata does not match order.");
  }

  if (payment.amount?.value !== order.amountValue || payment.amount?.currency !== order.currency) {
    throw new Error("Payment amount does not match order.");
  }
}

export async function createPendingOrder({
  email,
  amountValue,
  currency,
}: {
  email: string;
  amountValue: string;
  currency: string;
}): Promise<Order> {
  await ensureOrdersTable();

  const id = crypto.randomUUID();
  const sql = getSql();
  const rows = (await sql`
    INSERT INTO orders (id, email, status, amount_value, currency)
    VALUES (${id}, ${email}, 'pending', ${amountValue}, ${currency})
    RETURNING id, email, status, amount_value, currency, yookassa_payment_id, yookassa_payment_status, confirmation_url
  `) as OrderRow[];

  return mapOrder(rows[0]);
}

export async function attachYookassaPayment(orderId: string, payment: PaymentSnapshot) {
  await ensureOrdersTable();

  const sql = getSql();
  await sql`
    UPDATE orders
    SET
      yookassa_payment_id = ${payment.id},
      yookassa_payment_status = ${payment.status},
      confirmation_url = ${payment.confirmationUrl},
      payment_payload = ${JSON.stringify(payment.raw)}::jsonb,
      updated_at = now()
    WHERE id = ${orderId}
  `;
}

export async function getOrderById(orderId: string) {
  await ensureOrdersTable();

  const sql = getSql();
  const rows = (await sql`
    SELECT id, email, status, amount_value, currency, yookassa_payment_id, yookassa_payment_status, confirmation_url
    FROM orders
    WHERE id = ${orderId}
    LIMIT 1
  `) as OrderRow[];

  return rows[0] ? mapOrder(rows[0]) : null;
}

export async function getOrderByPaymentId(paymentId: string) {
  await ensureOrdersTable();

  const sql = getSql();
  const rows = (await sql`
    SELECT id, email, status, amount_value, currency, yookassa_payment_id, yookassa_payment_status, confirmation_url
    FROM orders
    WHERE yookassa_payment_id = ${paymentId}
    LIMIT 1
  `) as OrderRow[];

  return rows[0] ? mapOrder(rows[0]) : null;
}

export async function syncOrderWithYookassaPayment(order: Order): Promise<Order> {
  if (!order.yookassaPaymentId) {
    return order;
  }

  const sql = getSql();

  try {
    const payment = await getYookassaPayment(order.yookassaPaymentId);
    assertPaymentBelongsToOrder(order, payment);

    const nextStatus = mapPaymentStatus(payment.status);
    const paidAt = nextStatus === "succeeded" ? payment.captured_at || null : null;

    const rows = (await sql`
      UPDATE orders
      SET
        status = ${nextStatus},
        yookassa_payment_status = ${payment.status},
        payment_payload = ${JSON.stringify(payment)}::jsonb,
        paid_at = CASE
          WHEN ${nextStatus} = 'succeeded' THEN COALESCE(paid_at, ${paidAt}, now())
          ELSE paid_at
        END,
        canceled_at = CASE
          WHEN ${nextStatus} = 'canceled' THEN COALESCE(canceled_at, now())
          ELSE canceled_at
        END,
        last_error = NULL,
        updated_at = now()
      WHERE id = ${order.id}
      RETURNING id, email, status, amount_value, currency, yookassa_payment_id, yookassa_payment_status, confirmation_url
    `) as OrderRow[];

    return mapOrder(rows[0]);
  } catch (error) {
    await sql`
      UPDATE orders
      SET last_error = ${error instanceof Error ? error.message : "Payment sync failed."}, updated_at = now()
      WHERE id = ${order.id}
    `;

    throw error;
  }
}

export async function syncOrderPaymentByOrderId(orderId: string): Promise<SyncOrderPaymentResult> {
  const order = await getOrderById(orderId);

  if (!order) {
    return { type: "not_found" };
  }

  return {
    type: "verified",
    order: await syncOrderWithYookassaPayment(order),
  };
}

export async function syncOrderPaymentByPaymentId(paymentId: string): Promise<SyncOrderPaymentResult> {
  const order = await getOrderByPaymentId(paymentId);

  if (!order) {
    return { type: "not_found" };
  }

  return {
    type: "verified",
    order: await syncOrderWithYookassaPayment(order),
  };
}
