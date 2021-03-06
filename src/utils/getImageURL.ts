import { api } from "./api";

export const getImageURL = async (value: string) => {
  const res = await api.getImage(value);
  if (res.items) {
    return res.items[0].link;
  }

  throw new Error("Not image");
};
