import { getServerEnv } from "@/lib/env";
import type { Order } from "@/lib/orders";

type YookassaPaymentResponse = {
  id: string;
  status: string;
  confirmation?: {
    type?: string;
    confirmation_url?: string;
  };
};

export async function createYookassaPayment(order: Order, returnUrl: string) {
  const env = getServerEnv();
  const auth = Buffer.from(`${env.yookassaShopId}:${env.yookassaSecretKey}`).toString("base64");

  const response = await fetch("https://api.yookassa.ru/v3/payments", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      "Idempotence-Key": order.id,
    },
    body: JSON.stringify({
      amount: {
        value: order.amountValue,
        currency: order.currency,
      },
      capture: true,
      confirmation: {
        type: "redirect",
        return_url: returnUrl,
      },
      description: `Заказ ${order.id}`,
      metadata: {
        order_id: order.id,
        email: order.email,
      },
    }),
  });

  const payload = (await response.json().catch(() => null)) as YookassaPaymentResponse | null;

  if (!response.ok || !payload) {
    throw new Error(`YooKassa payment creation failed with status ${response.status}`);
  }

  const confirmationUrl = payload.confirmation?.confirmation_url;

  if (!payload.id || !payload.status || !confirmationUrl) {
    throw new Error("YooKassa payment response does not include confirmation_url");
  }

  return {
    id: payload.id,
    status: payload.status,
    confirmationUrl,
    raw: payload,
  };
}
