"use client";

import {
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";

type CheckoutContextValue = {
  openCheckout: () => void;
};

type CheckoutProviderProps = {
  children: ReactNode;
  button: string;
};

type CheckoutButtonProps = {
  children: ReactNode;
  variant?: "hero" | "cta";
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children, button }: CheckoutProviderProps) {
  const titleId = useId();
  const descriptionId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function openCheckout() {
    setError("");
    setIsOpen(true);
  }

  function closeCheckout() {
    if (isSubmitting) {
      return;
    }

    setError("");
    setIsOpen(false);
  }

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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeCheckout();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <CheckoutContext.Provider value={{ openCheckout }}>
      {children}

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-ink/65 px-4 py-5 backdrop-blur-sm sm:items-center sm:py-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeCheckout();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="relative max-h-[calc(100dvh-2.5rem)] w-full max-w-md overflow-y-auto rounded-[0.5rem] border border-burgundy/25 bg-milk p-5 text-ink shadow-soft sm:p-7"
          >
            <button
              type="button"
              onClick={closeCheckout}
              disabled={isSubmitting}
              className="absolute right-3 top-3 inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-burgundy/25 text-xl leading-none text-burgundy transition-none hover:bg-paper disabled:cursor-wait disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-4 focus:ring-offset-milk"
              aria-label="Закрыть"
            >
              ×
            </button>

            <div className="pr-10">
              <h2 id={titleId} className="font-serif text-3xl font-medium leading-tight text-balance sm:text-4xl">
                Укажите email
              </h2>
              <p id={descriptionId} className="mt-3 text-base leading-7 text-muted">
                Email нужен для оформления оплаты и получения дальнейшей информации.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
              <label className="sr-only" htmlFor="checkout-email">
                Email
              </label>
              <input
                id="checkout-email"
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                inputMode="email"
                placeholder="Ваш email"
                disabled={isSubmitting}
                className="min-h-12 w-full rounded-full border border-burgundy/30 bg-paper px-5 text-base text-ink outline-none transition-none placeholder:text-muted disabled:opacity-70 focus:ring-2 focus:ring-burgundy focus:ring-offset-4 focus:ring-offset-milk"
              />

              {error ? <p className="mt-3 text-sm font-semibold leading-6 text-burgundy">{error}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-burgundy px-6 text-sm font-semibold uppercase tracking-[0.18em] text-paper transition-none hover:bg-burgundy hover:text-paper active:bg-burgundy disabled:cursor-wait disabled:opacity-70 focus:bg-burgundy focus:text-paper focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-4 focus:ring-offset-milk"
              >
                {isSubmitting ? "Переходим к оплате..." : button}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </CheckoutContext.Provider>
  );
}

export function CheckoutButton({ children, variant = "cta" }: CheckoutButtonProps) {
  const checkout = useContext(CheckoutContext);

  if (!checkout) {
    throw new Error("CheckoutButton must be used inside CheckoutProvider.");
  }

  const className =
    variant === "hero"
      ? "inline-flex min-h-12 items-center justify-center rounded-full bg-burgundy px-6 text-sm font-semibold uppercase tracking-[0.18em] text-paper transition-none hover:bg-burgundy hover:text-paper active:bg-burgundy focus:bg-burgundy focus:text-paper focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-4 focus:ring-offset-ink"
      : "inline-flex min-h-12 items-center justify-center rounded-full bg-burgundy px-7 text-sm font-semibold uppercase tracking-[0.18em] text-paper transition-none hover:bg-burgundy hover:text-paper active:bg-burgundy focus:bg-burgundy focus:text-paper focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-4 focus:ring-offset-milk";

  return (
    <button type="button" onClick={checkout.openCheckout} className={className}>
      {children}
    </button>
  );
}
