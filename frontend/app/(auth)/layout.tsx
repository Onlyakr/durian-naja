"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const [isChecking, setIsChecking] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const res = await fetch("/api/users/me", {
					credentials: "include",
				});
				if (res.ok) {
					// User is logged in, redirect to employee page
					router.replace("/employee");
					return;
				}
			} catch {
				// Not logged in, allow access
			}
			setIsChecking(false);
		};
		checkAuth();
	}, [router]);

	if (isChecking) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-[url('/Frame3.svg')] bg-cover bg-center bg-no-repeat bg-fixed">
				<Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-[url('/Frame3.svg')] bg-cover bg-center bg-no-repeat bg-fixed px-4">
			{children}
		</div>
	);
}
