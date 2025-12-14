import { instance } from "@/shared/api/instance";

interface CustomItem {
   id: number,
   name: string,
   description: string,
   price: number
}

export const getCustomItem = async (): Promise<CustomItem[]> => {
  const response = await instance.get("/grow/shop");
  return response.data.accessaries;
}
