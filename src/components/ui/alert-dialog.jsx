import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Root
export const AlertDialog = AlertDialogPrimitive.Root
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger
export const AlertDialogPortal = AlertDialogPrimitive.Portal

// Overlay ✅
export const AlertDialogOverlay = React.forwardRef(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/10 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        className
      )}
      {...props}
    />
  )
)
AlertDialogOverlay.displayName = "AlertDialogOverlay"

// Content ✅
export const AlertDialogContent = React.forwardRef(
  ({ className, size = "default", ...props }, ref) => (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        data-size={size}
        className={cn(
          "fixed top-1/2 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2",
          "rounded-xl bg-white p-4 shadow-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
)
AlertDialogContent.displayName = "AlertDialogContent"

// Header
export const AlertDialogHeader = ({ className, ...props }) => (
  <div className={cn("text-center space-y-2", className)} {...props} />
)

// Footer
export const AlertDialogFooter = ({ className, ...props }) => (
  <div
    className={cn("flex justify-end gap-2 mt-4", className)}
    {...props}
  />
)

// Title ✅
export const AlertDialogTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
)
AlertDialogTitle.displayName = "AlertDialogTitle"

// Description ✅
export const AlertDialogDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  )
)
AlertDialogDescription.displayName = "AlertDialogDescription"

// Action ✅
export const AlertDialogAction = React.forwardRef(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Action asChild>
      <Button ref={ref} className={cn(className)} {...props} />
    </AlertDialogPrimitive.Action>
  )
)
AlertDialogAction.displayName = "AlertDialogAction"

// Cancel ✅
export const AlertDialogCancel = React.forwardRef(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Cancel asChild>
      <Button
        ref={ref}
        variant="outline"
        className={cn(className)}
        {...props}
      />
    </AlertDialogPrimitive.Cancel>
  )
)
AlertDialogCancel.displayName = "AlertDialogCancel"