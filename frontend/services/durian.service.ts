import axiosInstance from "./axios";

export interface Durian {
  id: string;
  name: string;
  description: string;
  imageURL: string;
}

export const DurianService = {
  getAll: async () => {
    const response = await axiosInstance.get<Durian[]>("/durians");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get<Durian>(`/durians/${id}`);
    return response.data;
  },
};