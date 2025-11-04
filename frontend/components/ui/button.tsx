import React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  asChild?: boolean
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, asChild, children, ...props }, ref) => {
    const baseStyles =
      "font-semibold transition-all duration-200 rounded-lg inline-flex items-center justify-center gap-2 cursor-pointer"

    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      outline: "border-2 border-primary text-primary hover:bg-primary/5",
      ghost: "text-foreground hover:bg-muted",
    }

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    }

    const Comp = asChild ? React.Fragment : "button"

 if (asChild && React.isValidElement(children)) {
  const child = children as React.ReactElement<{ className?: string }>
  return React.cloneElement(child, {
    className: cn(child.props.className, baseStyles, variants[variant], sizes[size], className),
  })
}


    return (
      <button ref={ref} className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"
export { Button }
