import { cn } from "@/lib/utils";
import LayoutHome from "../LayoutHome";
import { Button, buttonVariants } from "@/components/ui/button";
import { Command } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const savedUserResponse = await fetch(
            "http://127.0.0.1:3000/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username: username, email: email, password: password})
            }
        );

        const savedUser = await savedUserResponse.json();

        if (savedUser) {            
            navigate("/login");
            toast.success("User created!")
        }
    }

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
                                <form className="grid gap-6" onSubmit={handleSubmit}>
                                    <div className="grip gap-2">
                                        <div className="grid gap-1">
                                            <Label htmlFor="email">
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                placeholder="name@example.com"
                                                type="email"
                                                onChange={(e) => setEmail(e.target.value)}                                                
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
                                                onChange={(e) => setUsername(e.target.value)}                                                
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
                                                onChange={(e) => setPassword(e.target.value)}                                                
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <Button className="w-[25%]">Send</Button>
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