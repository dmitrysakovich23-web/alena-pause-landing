import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function SuccessPage() {
  return (
    <main className="min-h-screen">
      <section className="flex min-h-[78svh] items-center px-5 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.28em] text-burgundy">
            Визуальная заглушка
          </p>
          <h1 className="font-serif text-5xl font-medium leading-[0.98] text-balance sm:text-7xl">
            Оплата прошла успешно
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
            На этом этапе нет реальной оплаты и интеграций. Позже здесь появится сообщение с
            дальнейшими шагами, ссылкой на материалы или инструкцией для Telegram.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-ink/20 px-7 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:border-burgundy hover:text-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-4 focus:ring-offset-milk"
          >
            Вернуться на лендинг
          </Link>
        </div>
      </section>
      <CTA
        compact
        href="/"
        title="Пауза уже началась"
        description="Финальный текст для этой страницы можно будет заменить после согласования пользовательского сценария."
        button="На главную"
      />
      <Footer />
    </main>
  );
}
