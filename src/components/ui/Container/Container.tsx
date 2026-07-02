import styles from "./Container.module.css";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "prose";
  tag?: React.ElementType;
}

export default function Container({
  children,
  className,
  size,
  tag: Tag = "div",
  ...props
}: ContainerProps) {
  const cls = [
    styles.container,
    size === "prose" ? styles.sizeProze : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={cls} {...props}>
      {children}
    </Tag>
  );
}
