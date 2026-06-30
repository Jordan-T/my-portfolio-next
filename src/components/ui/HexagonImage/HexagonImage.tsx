import Image from "next/image";
import styles from "./HexagonImage.module.css";

interface Props {
  src: string;
  alt: string;
  width: number;
  className?: string;
  priority?: boolean;
}

export default function HexagonImage({
  src,
  alt,
  width,
  className,
  priority,
}: Props) {
  // Inline style is the sanctioned escape hatch for a runtime value: the dynamic
  // width feeds the `--width` custom property the CSS module reads. Not a
  // hardcoded design token (those stay in CSS).
  const sizeVar = { "--width": `${width}px` } as React.CSSProperties;
  return (
    <div
      className={[styles.wrap, className].filter(Boolean).join(" ")}
      style={sizeVar}
    >
      <div className={styles.inner}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={width * 1.1547}
          priority={priority}
        />
      </div>
    </div>
  );
}
