import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, Sprout } from "lucide-react";

const Main = () => {
	return (
		<main className="flex-1 bg-background">
			<section className="relative overflow-hidden py-20 md:py-20 lg:py-20">
				<div className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-yellow-400/20 blur-[120px] -z-10" />
				<div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-green-400/10 blur-[100px] -z-10" />

				<div className="container mx-auto flex flex-col items-center text-center gap-8 px-4">
					<Badge
						variant="secondary"
						className="px-4 py-1.5 text-sm bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200"
					>
						<Sprout className="mr-2 h-4 w-4" />
						Community อันดับ 1 ของคนรักทุเรียน
					</Badge>

					<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl">
						มากกว่าแค่ความอร่อย คือ <br className="hidden sm:inline" />
						<span className="text-yellow-500 relative">
							ศาสตร์แห่งทุเรียน
							<svg
								className="absolute w-full h-3 -bottom-1 left-0 text-yellow-300 -z-10"
								viewBox="0 0 100 10"
								preserveAspectRatio="none"
								aria-hidden="true"
							>
								<path
									d="M0 5 Q 50 10 100 5"
									stroke="currentColor"
									strokeWidth="8"
									fill="none"
								/>
							</svg>
						</span>
					</h1>

					<p className="max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
						เปิดโลกทุเรียนไทยที่ไม่ใช่แค่ &quot;หมอนทอง&quot; เรียนรู้วิธีการเลือกเนื้อที่ใช่
						ความแตกต่างของสายพันธุ์ และเรื่องราวจากสวนทุเรียนทั่วประเทศ
					</p>

					<div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
						<Button
							size="lg"
							className="h-12 px-8 text-lg bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full shadow-lg shadow-yellow-500/20"
							asChild
						>
							<Link href="/login">เข้าร่วมคอมมูนิตี้ฟรี</Link>
						</Button>

						<Button
							size="lg"
							variant="outline"
							className="h-12 px-8 text-lg rounded-full border-2"
							asChild
						>
							<Link href="/employee">
								ดูสายพันธุ์ทุเรียน
								<ArrowRightIcon className="w-4 h-4 ml-2" />
							</Link>
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Main;
