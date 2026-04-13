import Image from "next/image";

type CmsImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
};

/** Yerel `/images/...` için next/image; http(s) için img (CMS’te harici URL). */
export function CmsImage({
  src,
  alt,
  className,
  width,
  height,
  fill,
  sizes,
  priority,
}: CmsImageProps) {
  const remote = src.startsWith("http://") || src.startsWith("https://");

  if (remote) {
    if (fill) {
      return <img src={src} alt={alt} className={className} />;
    }
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className ?? ""}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      className={className}
      priority={priority}
    />
  );
}
