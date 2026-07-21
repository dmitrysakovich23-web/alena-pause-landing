"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type PaymentReturnStatusProps = {
  orderId?: string;
};

type Status = "checking" | "pending" | "succeeded" | "canceled" | "not_found" | "technical_error";

const retryDelays = [1500, 2500, 4000];

export function PaymentReturnStatus({ orderId }: PaymentReturnStatusProps) {
  const [status, setStatus] = useState<Status>(orderId ? "checking" : "not_found");
  const [attempt, setAttempt] = useState(0);

  async function checkStatus(nextAttempt = 0) {
    if (!orderId) {
      setStatus("not_found");
      return;
    }

    setStatus("checking");

    try {
      const response = await fetch(`/api/orders/${encodeURIComponent(orderId)}/status`, {
        method: "GET",
        cache: "no-store",
      });
      const payload = (await response.json()) as {
        status?: Status;
      };

      if (!response.ok) {
        setStatus(payload.status === "not_found" ? "not_found" : "technical_error");
        return;
      }

      setStatus(payload.status || "technical_error");
      setAttempt(nextAttempt);
    } catch {
      setStatus("technical_error");
    }
  }

  useEffect(() => {
    checkStatus(0);
  }, [orderId]);

  useEffect(() => {
    if (status !== "pending" || attempt >= retryDelays.length) {
      return;
    }

    const timer = window.setTimeout(() => {
      checkStatus(attempt + 1);
    }, retryDelays[attempt]);

    return () => window.clearTimeout(timer);
  }, [status, attempt]);

  const titleByStatus: Record<Status, string> = {
    checking: "Проверяем оплату",
    pending: "Оплата не завершена или ещё обрабатывается",
    succeeded: "Оплата успешно завершена",
    canceled: "Оплата отменена",
    not_found: "Не удалось найти заказ",
    technical_error: "Не удалось проверить оплату",
  };

  const bodyByStatus: Record<Status, string> = {
    checking: "Сверяем статус платежа с ЮKassa. Это займёт несколько секунд.",
    pending: "Если вы вышли из платёжного процесса, заказ остался без подтверждения. Можно вернуться на главную и попробовать оплатить снова.",
    succeeded: "Платёж подтверждён. Дальнейшая информация будет подготовлена на следующем этапе.",
    canceled: "ЮKassa вернула отменённый статус платежа. Вы можете попробовать оплатить ещё раз.",
    not_found: "Ссылка возврата некорректна или заказ уже недоступен для проверки.",
    technical_error: "Проверка временно не прошла. Повторите запрос через несколько секунд.",
  };

  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Статус оплаты</p>
      <h1 className="mt-4 font-serif text-5xl font-medium leading-[0.98] text-balance sm:text-7xl">
        {titleByStatus[status]}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted sm:text-xl">{bodyByStatus[status]}</p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {status === "technical_error" ? (
          <button
            type="button"
            onClick={() => checkStatus(attempt)}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-burgundy px-7 text-sm font-semibold uppercase tracking-[0.18em] text-paper transition-none hover:bg-burgundy hover:text-paper active:bg-burgundy focus:bg-burgundy focus:text-paper focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-4 focus:ring-offset-milk"
          >
            Повторить проверку
          </button>
        ) : null}

        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-burgundy/30 px-7 text-sm font-semibold uppercase tracking-[0.18em] text-burgundy transition-none hover:bg-paper focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-4 focus:ring-offset-milk"
        >
          {status === "canceled" ? "Попробовать ещё раз" : "На главную"}
        </Link>
      </div>
    </div>
  );
}
