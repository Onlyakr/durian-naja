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
		try {
			const durians = await prisma.durian.findMany();

			if (!durians) {
				return status(404, { success: false, message: "No durians found" });
			}

			return status(200, { success: true, data: durians });
		} catch (error) {
			const e = error as Error;
			return status(500, {
				success: false,
				message: e.message || "Internal server error",
			});
		}
	})
	.get("/durians/:id", async ({ params }) => {
		try {
			const durian = await prisma.durian.findUnique({
				where: {
					id: params.id,
				},
			});
			if (!durian) {
				return status(404, { success: false, message: "Durian not found" });
			}
			return status(200, { success: true, data: durian });
		} catch (error) {
			const e = error as Error;
			return status(500, {
				success: false,
				message: e.message || "Internal server error",
			});
		}
	})
	.get("/users", async () => {
		try {
			const users = await prisma.user.findMany();

			if (!users) {
				return status(404, { success: false, message: "No users found" });
			}

			return status(200, { success: true, data: users });
		} catch (error) {
			const e = error as Error;
			return status(500, {
				success: false,
				message: e.message || "Internal server error",
			});
		}
	})
	.post(
		"/auth/login",
		async ({ body, jwt, cookie: { auth } }) => {
			try {
				const isAuthorized = await authenticateUser(body.name, body.password);
				if (!isAuthorized) {
					return status(401, {
						success: false,
						message: "Invalid credentials",
					});
				}

				const value = await jwt.sign({ name: body.name });

				auth.set({
					value,
					httpOnly: true,
					maxAge: 7 * 86400,
					path: "/",
				});

				return status(200, {
					success: true,
					message: "Logged in successfully",
				});
			} catch (error) {
				const e = error as Error;
				return status(500, {
					success: false,
					message: e.message || "Internal server error",
				});
			}
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
