import { NextResponse, type NextRequest } from "next/server";
import { syncOrderPaymentByOrderId } from "@/lib/orders";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    orderId: string;
  }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const { orderId } = await context.params;

  if (!orderId) {
    return NextResponse.json({ status: "not_found", message: "Заказ не найден." }, { status: 404 });
  }

  try {
    const result = await syncOrderPaymentByOrderId(orderId);

    if (result.type === "not_found") {
      return NextResponse.json({ status: "not_found", message: "Заказ не найден." }, { status: 404 });
    }

    return NextResponse.json({
      orderId: result.order.id,
      status: result.order.status,
    });
  } catch {
    return NextResponse.json(
      {
        status: "technical_error",
        message: "Не удалось проверить статус оплаты. Попробуйте повторить проверку.",
      },
      { status: 500 },
    );
  }
}
