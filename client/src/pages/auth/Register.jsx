import { cn } from "@/lib/utils";
import LayoutHome from "../LayoutHome";
import { buttonVariants } from "@/components/ui/button";
import { Command } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
                            <div className="grid gap-6">
                                <form className="grid gap-6">
                                    <div className="grip gap-2">
                                        <div className="grid gap-1">
                                            <Label htmlFor="email">
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                placeholder="name@example.com"
                                                type="email"                                                
                                            />
                                        </div>
                                    </div>
                                    <div className="grip gap-2">
                                        <div className="grid gap-1">
                                            <Label htmlFor="username">
                                                Username
                                            </Label>
                                            <Input
                                                id="username"
                                                placeholder="example"
                                                type="text"                                                
                                            />
                                        </div>
                                    </div>
                                    <div className="grip gap-2">
                                        <div className="grid gap-1">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                            <Input
                                                id="password"
                                                placeholder="..."
                                                type="password"                                                
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </LayoutHome>
    )
}

export default Register;