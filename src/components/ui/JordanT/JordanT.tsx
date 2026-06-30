import Image from "next/image";
import styles from "./JordanT.module.css";

interface Props {
  className?: string;
  priority?: boolean;
  alt?: string;
}

export default function JordanT({ className, priority, alt }: Props) {
  const width = 240;
  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")}>
      <span className={styles.hex} aria-hidden="true" />
      {/* Wrapper isolates the one-shot slide-up so each element carries a single
          transform animation (wrap float / reveal slide / photo float) — two
          transform animations on one element fall back to the main thread. */}
      <span className={styles.reveal}>
        <Image
          className={styles.photo}
          src="/Jordan-T-portrait.svg"
          width={width}
          height={width}
          priority={priority}
          alt={alt || "Portrait de Jordan Taisne"}
        />
      </span>
    </div>
  );
}
