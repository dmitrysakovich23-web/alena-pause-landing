import { ensureOrdersTable, getSql } from "@/lib/db";

export type Order = {
  id: string;
  email: string;
  status: "pending";
  amountValue: string;
  currency: string;
};

type OrderRow = {
  id: string;
  email: string;
  status: "pending";
  amount_value: string;
  currency: string;
};

type PaymentSnapshot = {
  id: string;
  status: string;
  confirmationUrl: string;
  raw: unknown;
};

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
    RETURNING id, email, status, amount_value, currency
  `) as OrderRow[];
  const order = rows[0];

  return {
    id: order.id,
    email: order.email,
    status: order.status,
    amountValue: order.amount_value,
    currency: order.currency,
  };
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
