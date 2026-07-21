import { Footer } from "@/components/Footer";
import { PaymentReturnStatus } from "@/components/PaymentReturnStatus";
import { landingContent } from "@/data/content";

type PaymentReturnPageProps = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function PaymentReturnPage({ searchParams }: PaymentReturnPageProps) {
  const { orderId } = await searchParams;

  return (
    <main className="min-h-screen">
      <section className="flex min-h-[78svh] items-center px-5 py-16">
        <PaymentReturnStatus orderId={orderId} />
      </section>
      <Footer {...landingContent.footer} />
    </main>
  );
}
