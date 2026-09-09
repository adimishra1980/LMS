"use client";

import {
  BookOpen,
  LogOut,
  ChevronDown,
  Home,
  LayoutDashboardIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IAppProps {
  name: string;
  email: string;
  image?: string;
}

export function UserDropdown({ name, email, image }: IAppProps) {
  const router = useRouter();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Signed out successfully!");
        },
        onError: () => {
          toast.error("Failed to sign out!");
        },
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className="h-9 gap-2 px-2 bg-transparent hover:bg-transparent cursor-pointer" />
        }
      >
        <Avatar className="size-9">
          <AvatarImage src={image || "/avatar.jpg"} alt="Profile Image" />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <ChevronDown className="size-4 text-foreground opacity-60" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage src={image || "/avatar.jpg"} alt="Profile" />
                <AvatarFallback>
                  {name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="font-medium">{name}</span>
                <span className="text-xs text-muted-foreground">{email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            nativeButton={false}
            render={
              <Link href="/" className="flex items-center gap-2 py-2">
                <Home size={16} className="opacity-60" aria-hidden="true" />
                <span>Home</span>
              </Link>
            }
          ></DropdownMenuItem>

          <DropdownMenuItem
            nativeButton={false}
            render={
              <Link href="/courses" className="flex items-center gap-2 py-2">
                <BookOpen size={16} className="opacity-60" aria-hidden="true" />
                <span>Courses</span>
              </Link>
            }
          ></DropdownMenuItem>

          <DropdownMenuItem
            nativeButton={false}
            render={
              <Link href="/dashboard" className="flex items-center gap-2 py-2">
                <LayoutDashboardIcon
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span>Dashboard</span>
              </Link>
            }
          ></DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          nativeButton={true}
          render={
            <Button onClick={signOut} className="py-2 w-full">
              <LogOut />
              <span>Logout</span>
            </Button>
          }
        ></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
