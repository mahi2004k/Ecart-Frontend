import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

// Root
export const Dialog = DialogPrimitive.Root

// Trigger
export const DialogTrigger = DialogPrimitive.Trigger

// Portal
export const DialogPortal = DialogPrimitive.Portal

// Overlay ✅ FIXED
export const DialogOverlay = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity",
          className
        )}
        {...props}
      />
    )
  }
)
DialogOverlay.displayName = "DialogOverlay"

// Content ✅ FIXED
export const DialogContent = React.forwardRef(
  (
    { className, children, showCloseButton = true, ...props },
    ref
  ) => {
    return (
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl transition-all",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
            className
          )}
          {...props}
        >
          {children}

          {showCloseButton && (
            <DialogPrimitive.Close asChild>
              <button className="absolute right-4 top-4 rounded-md p-1 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    )
  }
)
DialogContent.displayName = "DialogContent"

// Header
export const DialogHeader = ({ className, ...props }) => {
  return (
    <div className={cn("flex flex-col space-y-2", className)} {...props} />
  )
}

// Footer
export const DialogFooter = ({
  className,
  showCloseButton = false,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-4",
        className
      )}
      {...props}
    >
      {children}

      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

// Title ✅ FIXED
export const DialogTitle = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Title
        ref={ref}
        className={cn("text-lg font-semibold", className)}
        {...props}
      />
    )
  }
)
DialogTitle.displayName = "DialogTitle"

// Description ✅ FIXED
export const DialogDescription = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-gray-500", className)}
        {...props}
      />
    )
  }
)
DialogDescription.displayName = "DialogDescription"

// Close
export const DialogClose = DialogPrimitive.Close