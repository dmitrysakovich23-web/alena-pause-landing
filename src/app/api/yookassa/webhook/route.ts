import { NextResponse, type NextRequest } from "next/server";
import { syncOrderPaymentByPaymentId } from "@/lib/orders";

export const runtime = "nodejs";

const supportedEvents = new Set(["payment.succeeded", "payment.canceled"]);

type YookassaWebhookBody = {
  event?: unknown;
  object?: {
    id?: unknown;
  };
};

export async function POST(request: NextRequest) {
  let body: YookassaWebhookBody;

  try {
    body = (await request.json()) as YookassaWebhookBody;
  } catch {
    return NextResponse.json({ error: "Invalid webhook payload." }, { status: 400 });
  }

  const event = typeof body.event === "string" ? body.event : "";
  const paymentId = typeof body.object?.id === "string" ? body.object.id : "";

  if (!supportedEvents.has(event) || !paymentId) {
    return NextResponse.json({ error: "Unsupported or invalid webhook payload." }, { status: 400 });
  }

  try {
    const result = await syncOrderPaymentByPaymentId(paymentId);

    if (result.type === "not_found") {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
