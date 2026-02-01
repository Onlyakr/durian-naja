"use client";

import { AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { DurianCard } from "@/components/Main/MainEmpolyee";
import { Button } from "../ui/button";

type Durian = {
	createdAt: string;
	description: string;
	id: string;
	imageURL: string;
	name: string;
	updatedAt: string;
};

const fetchDurians = async () => {
	const response = await fetch(`/api/durians`, {
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Failed to fetch durians");
	}

	return response.json();
};

export default function DurianCatalog() {
	const [durians, setDurians] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const refetchDurians = async () => {
		try {
			setIsLoading(true);
			const { data: durians } = await fetchDurians();
			setDurians(durians);
		} catch (error) {
			const e = error as Error;
			setError(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const { data: durians } = await fetchDurians();
				setDurians(durians);
			} catch (error) {
				const e = error as Error;
				setError(e.message);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center h-64 text-gray-500 animate-in fade-in">
				<Loader2 className="h-10 w-10 animate-spin mb-3 text-yellow-500" />
				<p className="font-medium">กำลังโหลดข้อมูลทุเรียน...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center h-64 text-red-600 bg-red-50/50 rounded-xl border border-red-100 p-6">
				<AlertCircle className="h-12 w-12 mb-3 opacity-80" />
				<p className="font-semibold text-lg">{error}</p>
				<Button
					onClick={refetchDurians}
					className="mt-4 flex items-center gap-2 px-5 py-2 bg-white border border-red-200 rounded-full transition shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={isLoading}
				>
					{isLoading ? (
						<Loader2 className="h-3 w-3 animate-spin" />
					) : (
						<RefreshCw className="h-3 w-3" />
					)}
					ลองใหม่อีกครั้ง
				</Button>
			</div>
		);
	}

	return (
		<div className="animate-in slide-in-from-bottom-4 duration-500">
			<div className="flex justify-end mb-4">
				<Button
					onClick={refetchDurians}
					className="flex items-center gap-1 text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={isLoading}
				>
					{isLoading ? (
						<Loader2 className="h-3 w-3 animate-spin" />
					) : (
						<RefreshCw className="h-3 w-3" />
					)}
					รีเฟรชข้อมูล
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
				{durians.map((durian: Durian) => (
					<DurianCard key={durian.id} durian={durian} />
				))}
			</div>
		</div>
	);
}
