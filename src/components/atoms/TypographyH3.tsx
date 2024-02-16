import { cn } from "@/lib/utils";

export function TypographyH3({
  className,
  children,
  ...props
}: React.HtmlHTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}
