import api from "@/lib/axios";

type ToolPayload = Record<string, unknown>;

export const getTools = async () => {
  const res = await api.get("/auth/tools");
  return res.data;
};

export const createTool = async (data: ToolPayload) => {
  const res = await api.post("/auth/tools", data);
  return res.data;
};

export const updateTool = async (id: string, data: ToolPayload) => {
  const res = await api.put(`/auth/tools/${id}`, data);
  return res.data;
};

export const deleteTool = async (id: string) => {
  const res = await api.delete(`/auth/tools/${id}`);
  return res.data;
};