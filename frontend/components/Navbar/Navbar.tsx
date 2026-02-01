"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
	name: string;
}

const Navbar = () => {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await fetch("/api/users/me", {
					credentials: "include",
				});
				if (!res.ok) return;
				const { data } = await res.json();
				console.log(data);
				setUser(data);
			} catch {
				// Not logged in
			}
		};
		fetchUser();
	}, []);

	const handleLogout = async () => {
		await fetch("/api/auth/logout", {
			method: "POST",
			credentials: "include",
		});
		setUser(null);
		router.push("/");
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
			<div className="container mx-auto px-4 h-16 flex items-center justify-between">
				<Link href="/" className="font-bold text-xl">
					DURIAN
				</Link>
				{/* <div className="hidden md:flex relative w-[300px]">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input placeholder="ค้นหา..." className="pl-9 rounded-full" />
				</div> */}
				<div className="flex items-center gap-2">
					{user ? (
						<div className="flex items-center gap-4">
							<span className="text-sm text-muted-foreground">
								สวัสดี,{" "}
								<span className="font-medium text-foreground">{user.name}</span>
							</span>
							<Button
								variant="outline"
								size="sm"
								onClick={handleLogout}
								className="cursor-pointer"
							>
								Logout
							</Button>
						</div>
					) : (
						<div className="flex gap-2">
							<Button variant="secondary" asChild>
								<Link href="/login">Login</Link>
							</Button>
							<Button asChild>
								<Link href="/register">Register</Link>
							</Button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Navbar;
