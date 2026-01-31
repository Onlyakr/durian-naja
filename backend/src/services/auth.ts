import radius from "radius"
import dgram from "dgram";

const RADIUS_SETTINGS = {
	host: process.env.RADIUS_SERVER!,
	port: 1812,
	secret: process.env.RADIUS_SECRET!,
};

export const authenticateUser = (
	username: string,
	password: string,
): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		const client = dgram.createSocket("udp4");

		const packet = radius.encode({
			code: "Access-Request",
			secret: RADIUS_SETTINGS.secret,
			identifier: Math.floor(Math.random() * 256),
			attributes: [
				["User-Name", username],
				["User-Password", password],
				["NAS-IP-Address", "127.0.0.1"],
			],
		});

		const timeout = setTimeout(() => {
			client.close();
			reject(new Error("RADIUS timeout"));
		}, 5000);

		client.on("error", (err) => {
			clearTimeout(timeout);
			client.close();
			reject(err);
		});

		client.on("message", (msg) => {
			clearTimeout(timeout);
			try {
				const response = radius.decode({
					packet: msg,
					secret: RADIUS_SETTINGS.secret,
				});
				client.close();
				resolve(response.code === "Access-Accept");
			} catch (err) {
				client.close();
				reject(err);
			}
		});

		client.send(
			packet,
			0,
			packet.length,
			RADIUS_SETTINGS.port,
			RADIUS_SETTINGS.host,
		);
	});
};
