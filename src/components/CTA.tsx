import { CheckoutButton } from "@/components/Checkout";

type CTAProps = {
  button: string;
  compact?: boolean;
};

export function CTA({ button, compact = false }: CTAProps) {
  return (
    <section className={compact ? "px-5 py-6" : "px-5 py-6 sm:py-8"}>
      <div className="mx-auto max-w-5xl border-y border-burgundy/25 py-6 text-center sm:py-7">
        <CheckoutButton>{button}</CheckoutButton>
      </div>
    </section>
  );
}
