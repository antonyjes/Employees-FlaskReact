import { HomeNav } from "@/components/home-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LayoutHome = (children) => {
    return(
        <div className="flex min-h-screen flex-col">
            <header className="container z-40 bg-background">
                <div className="flex h-20 items-center justify-between py-6">
                    <HomeNav />
                    <nav>
                        <a href="/login" className={cn(buttonVariants({variant: "secondary", size: "sm"}), "px-4")}>Login</a>
                        <a href="/register" className={cn(buttonVariants({variant: "primary", size: "sm"}), "px-4")}>Register</a>
                    </nav>
                </div>
            </header>
            <main className="flex-1">
                {children}
            </main>
        </div>
    )
}

export default LayoutHome;