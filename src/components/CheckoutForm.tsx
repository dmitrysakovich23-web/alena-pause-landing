"use client";

import { FormEvent, useState } from "react";

type CheckoutFormProps = {
  button: string;
  variant?: "light" | "dark";
};

export function CheckoutForm({ button, variant = "light" }: CheckoutFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const payload = (await response.json()) as {
        confirmationUrl?: string;
        error?: string;
      };

      if (!response.ok || !payload.confirmationUrl) {
        throw new Error(payload.error || "Не удалось перейти к оплате.");
      }

      window.location.assign(payload.confirmationUrl);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Не удалось перейти к оплате.");
      setIsSubmitting(false);
    }
  }

  const inputTone =
    variant === "dark"
      ? "border-paper/55 bg-paper/10 text-paper placeholder:text-paper/60 focus:ring-offset-ink"
      : "border-burgundy/30 bg-paper text-ink placeholder:text-muted focus:ring-offset-milk";

  const buttonTone = variant === "dark" ? "focus:ring-offset-ink" : "focus:ring-offset-milk";
  const errorTone = variant === "dark" ? "text-paper" : "text-burgundy";

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl">
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`checkout-email-${variant}`}>
          Email
        </label>
        <input
          id={`checkout-email-${variant}`}
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
          inputMode="email"
          placeholder="Ваш email"
          className={`min-h-12 w-full rounded-full border px-5 text-base outline-none transition-none focus:ring-2 focus:ring-burgundy ${inputTone}`}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex min-h-12 w-full shrink-0 items-center justify-center rounded-full bg-burgundy px-6 text-sm font-semibold uppercase tracking-[0.18em] text-paper transition-none hover:bg-burgundy hover:text-paper active:bg-burgundy disabled:cursor-wait disabled:opacity-70 focus:bg-burgundy focus:text-paper focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-4 sm:w-auto ${buttonTone}`}
        >
          {isSubmitting ? "Переходим..." : button}
        </button>
      </div>
      {error ? <p className={`w-full text-center text-sm font-semibold sm:basis-full ${errorTone}`}>{error}</p> : null}
    </form>
  );
}
