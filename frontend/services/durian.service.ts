import axiosInstance from "./axios";

export interface Durian {
  id: string;
  name: string;
  description: string;
  imageURL: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const DurianService = {
  getAll: async (): Promise<Durian[]> => {
    const response = await axiosInstance.get<ApiResponse<Durian[]>>("/durians");
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Failed to fetch durians");
    }
    return response.data.data;
  },

  getById: async (id: string): Promise<Durian> => {
    const response = await axiosInstance.get<ApiResponse<Durian>>(`/durians/${id}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Durian not found");
    }
    return response.data.data;
  },
};