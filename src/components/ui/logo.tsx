import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "white";
}

export function Logo({
  className,
  size = "md",
  variant = "default",
}: LogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
    xl: "h-12",
  };

  const textColor = variant === "white" ? "text-white" : "text-primary";
  const accentColor = variant === "white" ? "text-blue-200" : "text-blue-500";

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(sizeClasses[size], "w-auto")}
        >
          <path
            d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
            fill="currentColor"
            fillOpacity="0.1"
          />
          <path
            d="M12 10L20 5L28 10V20L20 25L12 20V10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 25V35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 20L32 22.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 20L8 22.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 5L20 15L28 20"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span
        className={cn("ml-2 font-bold tracking-tight", textColor, {
          "text-lg": size === "sm",
          "text-xl": size === "md",
          "text-2xl": size === "lg",
          "text-3xl": size === "xl",
        })}
      >
        Lynop
      </span>
    </div>
  );
}
