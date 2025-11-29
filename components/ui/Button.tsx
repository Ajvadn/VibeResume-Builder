import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
    {
        variants: {
            variant: {
                default: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-violet-500 hover:to-indigo-500 border border-transparent transition-all duration-300",
                destructive:
                    "bg-red-500 text-destructive-foreground hover:bg-red-500/90 shadow-lg shadow-red-500/20",
                outline:
                    "border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white text-slate-300 backdrop-blur-sm transition-all duration-300",
                secondary:
                    "bg-white/5 text-white hover:bg-white/10 border border-white/10 shadow-lg shadow-black/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20",
                ghost: "hover:bg-white/10 hover:text-white text-slate-400 transition-all duration-300",
                link: "text-primary underline-offset-4 hover:underline",
                glass: "bg-white/5 border border-white/10 text-white hover:bg-white/10 shadow-lg shadow-black/10 backdrop-blur-md transition-all duration-300",
                neon: "bg-transparent border border-purple-500 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)] hover:shadow-[0_0_20px_rgba(168,85,247,0.7)] hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-300",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, isLoading, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </Comp>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
