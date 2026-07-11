import Link from "next/link";
import { Footer } from "@/components/Footer";
import { landingContent, successContent } from "@/data/content";

export default function SuccessPage() {
  return (
    <main className="min-h-screen">
      <section className="flex min-h-[78svh] items-center px-5 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-5xl font-medium leading-[0.98] text-balance sm:text-7xl">
            {successContent.title}
          </h1>
          <p className="mx-auto mt-6 whitespace-nowrap text-base font-semibold leading-8 text-burgundy sm:text-xl">
            {successContent.description}
          </p>
          <Link
            href="https://t.me/AlenaFEDEL"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-burgundy px-7 text-sm font-semibold tracking-[0.12em] text-paper transition-none hover:bg-burgundy hover:text-paper active:bg-burgundy focus:bg-burgundy focus:text-paper focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-4 focus:ring-offset-milk"
          >
            {successContent.backButton}
          </Link>
        </div>
      </section>
      <Footer {...landingContent.footer} />
    </main>
  );
}
