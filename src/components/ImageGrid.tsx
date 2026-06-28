import Image from "next/image";

type ImageGridProps = {
  kicker: string;
  title: string;
  images: string[];
};

export function ImageGrid({ kicker, title, images }: ImageGridProps) {
  return (
    <section className="px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col gap-3 border-t border-burgundy/25 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-xs uppercase tracking-[0.28em] text-burgundy">{kicker}</p>
          <h2 className="font-serif text-4xl font-medium leading-none sm:text-5xl">{title}</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-4">
          {images.map((src, index) => (
            <div
              key={src}
              className={[
                "grain relative overflow-hidden bg-ink/10",
                index === 0 || index === 5
                  ? "col-span-2 aspect-[4/5] sm:col-span-2 sm:aspect-[3/4]"
                  : "aspect-[3/4] sm:col-span-1",
              ].join(" ")}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 640px) 16vw, 50vw"
                className="photo-treatment object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
