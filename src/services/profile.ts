import api from "@/lib/axios";

export const getProfile = async () => {
  const res = await api.get("/auth/profile");
  return res.data;
};

export const updateProfile = async (data: any) => {
  const res = await api.put("/auth/profile", data);
  return res.data;
};