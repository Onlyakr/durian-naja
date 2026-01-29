import { Elysia, status, t } from "elysia";
import { prisma } from "./lib/prisma";
import { authenticateUser } from "./services/auth";

import jwt from "@elysiajs/jwt";

const app = new Elysia()
	.use(
		jwt({
			name: "jwt",
			secret: "Fischl von Luftschloss Narfidort",
		}),
	)
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
	.post(
		"/auth/login",
		async ({ body, jwt, cookie: { auth } }) => {
			const isAuthorized = await authenticateUser(body.name, body.password);
			if (!isAuthorized) {
				return status(401, { success: false, message: "Invalid credentials" });
			}

			const value = await jwt.sign({ name: body.name });

			auth.set({
				value,
				httpOnly: true,
				maxAge: 7 * 86400,
				path: "/",
			});

			return status(200, { success: true, message: "Logged in successfully" });
		},
		{
			body: t.Object({
				name: t.String(),
				password: t.String(),
			}),
		},
	)
	.listen(8080);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
