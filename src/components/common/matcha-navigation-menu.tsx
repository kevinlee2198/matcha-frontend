import { auth } from "@/auth";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  BellIcon,
  CircleUserIcon,
  HomeIcon,
  MessageSquareIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SignInButton from "../auth/signin-button";
import SignUpButton from "../auth/signup-button";
import SearchBar from "./search-bar";

// See https://ui.shadcn.com/docs/components/navigation-menu for more complex navigation

async function MatchaNavigationMenu() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 gap-4">
        {/* Left: Logo */}
        <Link href="/" className="text-lg font-semibold">
          matcha
        </Link>

        {/* Center: Search Bar */}
        <div className="flex-1 hidden sm:block">
          <SearchBar />
        </div>

        {/* Right: Icons and Auth */}
        <div className="flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-2">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/">
                    <HomeIcon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/messages">
                    <MessageSquareIcon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/notifications">
                    <BellIcon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* User avatar or auth buttons */}
          {session?.user ? (
            <Link href="/profile" className="hover:opacity-80 transition">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              ) : (
                <CircleUserIcon className="h-6 w-6 text-muted-foreground" />
              )}
            </Link>
          ) : (
            <>
              <SignInButton />
              <SignUpButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MatchaNavigationMenu;
