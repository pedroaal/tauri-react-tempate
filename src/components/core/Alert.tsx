import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "../../utils/classes"
import type { IAlertTypes } from "~/store/alertStore"

interface IAlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: IAlertTypes
}

const Alert = forwardRef<HTMLDivElement, IAlertProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-lg border p-4",
          {
            "bg-background text-foreground": variant === "default",
            "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive":
              variant === "destructive",
            "border-success/50 text-success dark:border-success [&>svg]:text-success":
              variant === "success",
            "border-warning/50 text-warning dark:border-warning [&>svg]:text-warning":
              variant === "warning",
          },
          className,
        )}
        {...props}
      />
    )
  },
)
Alert.displayName = "Alert"

const AlertTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription, AlertTitle }
