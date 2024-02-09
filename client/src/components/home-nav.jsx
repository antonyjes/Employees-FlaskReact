import { Command } from "lucide-react"

export const HomeNav = () => {
    return(
        <div className="flex gap-6 md:gap-10">
            <a href="/" className="hidden items-center space-x-2 md:flex">
                <Command />
                <span className="hidden font-bold sm:inline-block">
                    CRUD
                </span>
            </a>
            <nav className="hidden gap-6 md:flex">
                <a href="/" className="text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm">
                    Inicio
                </a>
                <a href="/" className="text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm">
                    Pricing
                </a>
                <a href="/" className="text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm">
                    About us
                </a>
            </nav>
        </div>
    )
}