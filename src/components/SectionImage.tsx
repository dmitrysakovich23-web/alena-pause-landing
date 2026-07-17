import Image, { type StaticImageData } from "next/image";

type SectionImageProps = {
  src: StaticImageData;
  alt: string;
  width: number;
  height: number;
  frame?: "square" | "landscape";
  objectPosition?: string;
};

export function SectionImage({
  src,
  alt,
  width,
  height,
  frame,
  objectPosition,
}: SectionImageProps) {
  const isLandscape = width > height * 1.15;
  const imageFrame = frame ?? (isLandscape ? "landscape" : "square");

  const containerClassName = [
    "relative w-full overflow-hidden",
    imageFrame === "landscape" ? "aspect-[4/3]" : "aspect-square",
  ].join(" ");

  return (
    <div className={containerClassName}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1280px) 42vw, 100vw"
        className="photo-treatment object-cover"
        style={{ objectPosition: objectPosition ?? "50% 50%" }}
      />
    </div>
  );
}
