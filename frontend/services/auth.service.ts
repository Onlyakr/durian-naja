import axiosInstance from "./axios";

const DEFAULT_PROFILE_IMAGE = "https://github.com/shadcn.png";

export interface UserProfile {
	id: string;
	name: string;
	email: string;
	image: string;
}

export const AuthService = {
	login: async (name: string, password: string) => {
		try {
			const response = await axiosInstance.post("/auth/login", {
				name,
				password,
			});
			const userData = response.data.user || response.data;
			if (userData) {
				const userWithImage: UserProfile = {
					...userData,
					image: DEFAULT_PROFILE_IMAGE,
				};
				localStorage.setItem("user", JSON.stringify(userWithImage));
				return userWithImage;
			}
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("/auth/logout");
		} catch (error) {
			console.error("Logout error", error);
		} finally {
			localStorage.removeItem("user");
			window.location.href = "/login";
		}
	},

	getCurrentUser: (): UserProfile | null => {
		if (typeof window !== "undefined") {
			const userStr = localStorage.getItem("user");
			if (userStr) return JSON.parse(userStr);
		}
		return null;
	},
};
