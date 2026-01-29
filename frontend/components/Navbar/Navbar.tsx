"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, LogOut, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthService, UserProfile } from "@/services/auth.service"; // import

const Navbar = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  // ดึงข้อมูลเมื่อโหลดหน้าเว็บ
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="font-bold text-xl">DURIAN</Link>

        {/* SEARCH */}
        <div className="hidden md:flex relative w-[300px]">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
           <Input placeholder="ค้นหา..." className="pl-9 rounded-full" />
        </div>

        {/* LOGIN / PROFILE */}
        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    {/* รูปนี้จะมาจาก AuthService ที่เราบังคับไว้ครับ */}
                    <AvatarImage src={user.image} alt={user.username} />
                    <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    <p>{user.username}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
                <Button variant="ghost" asChild><Link href="/login">Login</Link></Button>
                <Button className="bg-yellow-500 text-black hover:bg-yellow-600" asChild>
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;