import { cn } from "@/lib/utils";
import LayoutHome from "../LayoutHome";
import { buttonVariants } from "@/components/ui/button";
import { Command } from "lucide-react";

const Register = () => {
    return(
        <LayoutHome>
            <div className="min-h-[80vh]">
                <div className="container grid h-[80vh] w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-1 lg:px-0">
                    <a href="/login" className={cn(buttonVariants({ variant: "ghost"}), "absolute right-4 top-20 md:right-8 md:top-24")}>Login</a>
                    <div className="lg:p-8">
                        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                            <div className="flex flex-col space-y-2 text-center">
                                <Command className="mx-auto h-6 w-6" />
                                <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                                <p className="text-sm text-muted-foreground">Enter your email below to create your account</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </LayoutHome>
    )
}

export default Register;