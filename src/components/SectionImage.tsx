import Image, { type StaticImageData } from "next/image";

type SectionImageProps = {
  src: StaticImageData;
  alt: string;
  width: number;
  height: number;
};

export function SectionImage({ src, alt, width, height }: SectionImageProps) {
  const isPortrait = height > width * 1.15;
  const isLandscape = width > height * 1.15;
  const orientation = isPortrait ? "portrait" : isLandscape ? "landscape" : "square";

  const imageClassName = [
    "photo-treatment h-auto object-contain",
    orientation === "portrait"
      ? "w-auto max-h-[78svh] max-w-[88%]"
      : "w-full max-w-full",
  ].join(" ");

  return (
    <div className="flex justify-center overflow-hidden bg-transparent shadow-soft">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={orientation === "portrait" ? "(min-width: 1280px) 34vw, 88vw" : "(min-width: 1280px) 42vw, 100vw"}
        className={imageClassName}
      />
    </div>
  );
}
