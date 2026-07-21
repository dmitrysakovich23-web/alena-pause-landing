import { NextResponse, type NextRequest } from "next/server";
import { getServerEnv } from "@/lib/env";
import { createPendingOrder, attachYookassaPayment } from "@/lib/orders";
import { createYookassaPayment } from "@/lib/yookassa";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос." }, { status: 400 });
  }

  const email = typeof body === "object" && body !== null && "email" in body ? String(body.email).trim().toLowerCase() : "";

  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Введите корректный email." }, { status: 400 });
  }

  try {
    const env = getServerEnv();
    const returnUrl = env.yookassaReturnUrl || new URL("/success", request.nextUrl.origin).toString();
    const order = await createPendingOrder({
      email,
      amountValue: env.yookassaAmountValue,
      currency: env.yookassaCurrency,
    });
    const payment = await createYookassaPayment(order, returnUrl);

    await attachYookassaPayment(order.id, payment);

    return NextResponse.json({
      orderId: order.id,
      paymentId: payment.id,
      confirmationUrl: payment.confirmationUrl,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Не удалось создать заказ и платёж. Попробуйте ещё раз." },
      { status: 500 },
    );
  }
}
