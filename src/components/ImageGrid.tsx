import Image from "next/image";

type ImageGridProps = {
  images: string[];
};

export function ImageGrid({ images }: ImageGridProps) {
  return (
    <section className="px-5 py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-4">
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
    </section>
  );
}
