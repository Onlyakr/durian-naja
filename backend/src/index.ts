import { Elysia, status, t } from "elysia";
import { prisma } from "./lib/prisma";
import { authenticateUser } from "./services/auth";

import jwt from "@elysiajs/jwt";
import openapi from "@elysiajs/openapi";

const app = new Elysia()
	.use(openapi())
	.use(
		jwt({
			name: "jwt",
			secret: process.env.JWT_SECRET!,
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
	.get("/users/me", async ({ jwt, cookie: { auth } }) => {
		try {
			const token = auth.value as string | undefined;
			if (!token) {
				return status(401, {
					success: false,
					message: "Unauthorized - Please login first",
				});
			}
			const profile = await jwt.verify(token);
			if (!profile) {
				return status(401, {
					success: false,
					message: "Unauthorized - Invalid token",
				});
			}
			return status(200, { success: true, data: profile });
		} catch (error) {
			const e = error as Error;
			return status(500, {
				success: false,
				message: e.message || "Internal server error",
			});
		}
	})
	.get("/users", async ({ jwt, cookie: { auth } }) => {
		try {
			const token = auth.value as string | undefined;
			if (!token) {
				return status(401, {
					success: false,
					message: "Unauthorized - Please login first",
				});
			}
			const profile = await jwt.verify(token);
			if (!profile) {
				return status(401, {
					success: false,
					message: "Unauthorized - Invalid token",
				});
			}

			const users = await prisma.user.findMany({
				select: {
					id: true,
					name: true,
					email: true,
					createdAt: true,
					updatedAt: true,
				},
			});

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
	.post("/auth/logout", async ({ cookie: { auth } }) => {
		try {
			const token = auth.value;

			if (!token) {
				return status(401, {
					success: false,
					message: "Unauthorized - Please login first",
				});
			}

			auth.remove();

			return status(200, "Logged out successfully");
		} catch (error) {
			const e = error as Error;
			return status(500, {
				success: false,
				message: e.message || "Internal server error",
			});
		}
	})
	.listen(8080);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
