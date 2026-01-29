import { prisma } from "../src/lib/prisma";

const duriansData = [
	{
		name: "Monthong",
		description:
			"The most popular Thai durian variety. Known for its thick, creamy flesh with a mild, sweet taste and less pungent smell. Golden yellow color with large pods.",
		imageURL: "https://images.unsplash.com/photo-1588164270095-c40e7e159bd5",
	},
	{
		name: "Chanee",
		description:
			"One of the oldest Thai durian varieties. Features bright yellow flesh with a rich, sweet flavor and stronger aroma. Smaller seeds and more flesh per fruit.",
		imageURL: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e",
	},
	{
		name: "Kan Yao",
		description:
			"Premium long-stem durian highly prized for its exceptional sweetness and creamy texture. Known as the 'Gibbon' durian due to its long stem.",
		imageURL: "https://images.unsplash.com/photo-1609001654643-7d73d9fd7d88",
	},
	{
		name: "Kradum Thong",
		description:
			"Golden Button durian with small, round shape. Sweet and aromatic with pale yellow flesh. Popular for its balanced flavor profile.",
		imageURL: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f",
	},
	{
		name: "Phuang Manee",
		description:
			"Cluster of Gems durian known for its exceptionally sweet taste and fragrant aroma. Creamy texture with deep yellow flesh.",
		imageURL: "https://images.unsplash.com/photo-1598271449041-3ebf83f24d58",
	},
	{
		name: "Kob Picul",
		description:
			"A newer variety gaining popularity for its buttery texture and sweet, less pungent taste. Great for durian beginners.",
		imageURL: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
	},
	{
		name: "Musang King",
		description:
			"Malaysian variety popular in Thailand. Intense bittersweet flavor with thick, creamy bright yellow flesh. Considered premium grade.",
		imageURL: "https://images.unsplash.com/photo-1599574212348-f84e7e1c9b15",
	},
	{
		name: "Black Thorn",
		description:
			"Rare and expensive variety with distinctive spiky thorns. Complex flavor profile with hints of roasted almonds and caramel.",
		imageURL: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716",
	},
];

const usersData = [
	{
		name: "admin",
		email: "admin@example.com",
		password: "admin123",
	},
	{
		name: "user",
		email: "user@example.com",
		password: "user123",
	},
];

async function main() {
	console.log("Start seeding...");

	await prisma.durian.deleteMany();
	await prisma.user.deleteMany();

	for (const durian of duriansData) {
		const created = await prisma.durian.create({
			data: durian,
		});
		console.log(`Created durian: ${created.name} with id: ${created.id}`);
	}

	for (const user of usersData) {
		const created = await prisma.user.create({
			data: user,
		});
		console.log(`Created user: ${created.name} with id: ${created.id}`);
	}
	console.log("Seeding finished.");
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
