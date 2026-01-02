"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { Button } from "@/components/atoms/button";
import { useAuth } from "@/components/auth-provider";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import logo from "@/assets/MomentumX_Logo.png";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const linkClass = (href: string) => {
    const active =
      href === "/problems/new" ? pathname === href : pathname?.startsWith(href);
    return cn(
      "transition-colors",
      active
        ? "text-blue-500 font-semibold hover:text-blue-500"
        : "text-muted-foreground hover:text-blue-300"
    );
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src={logo}
              alt="MomentumX"
              width={24}
              height={24}
              className="rounded-sm"
            />
            <span className="hidden font-bold sm:inline-block text-lg tracking-tight">
              MomentumX
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/discovery" className={linkClass("/discovery")}>
              Discovery
            </Link>
            <Link href="/problems/new" className={linkClass("/problems/new")}>
              Submit Idea
            </Link>
            <Link href="/teams" className={linkClass("/teams")}>
              Teams
            </Link>
            <Link href="/notifications" className={linkClass("/notifications")}>
              Notifications
            </Link>
            <Link href="/profile" className={linkClass("/profile")}>
              Profile
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search or other items */}
          </div>
          <nav className="flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button size="sm" onClick={() => signOut(auth)}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Button size="sm" asChild>
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
