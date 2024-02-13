import { HomeFooter } from "@/components/home-footer";
import { HomeNav } from "@/components/home-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LayoutHome = (
  { children,
  items = [{ title: "Inicio", href: "/" }],
  isAuth = false }
) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <HomeNav items={items} />
          {isAuth ? (
            <nav>
              <a
                href="/signout"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" })
                )}
              >
                Sign out
              </a>
            </nav>
          ) : (
            <nav>
              <a
                href="/login"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4"
                )}
              >
                Login
              </a>
              <a
                href="/register"
                className={cn(
                  buttonVariants({ variant: "primary", size: "sm" }),
                  "px-4"
                )}
              >
                Register
              </a>
            </nav>
          )}
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <HomeFooter />
    </div>
  );
};

export default LayoutHome;
