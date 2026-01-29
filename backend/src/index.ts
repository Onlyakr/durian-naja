import { Elysia, status, t } from "elysia";
import { prisma } from "./lib/prisma";

const app = new Elysia()
	.get("/", () => "Hello Durain naja.")
	.get("/durians", async () => {
		const durians = await prisma.durian.findMany();
		return status(200, { durians });
	})
	.get(
		"/durians/:id",
		async ({ params }) => {
			const durian = await prisma.durian.findUnique({
				where: {
					id: params.id,
				},
			});
			return status(200, { durian });
		},
		{
			params: t.Object({
				id: t.String(),
			}),
		},
	)
	.get("/users", async () => {
		const users = await prisma.user.findMany();
		return status(200, { users });
	})
	.listen(8080);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
