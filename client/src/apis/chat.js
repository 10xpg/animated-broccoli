import { httpClient } from "./client";

export const getAllChats = async () => {
  try {
    const response = await httpClient.get("/api/chat/");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createNewChat = async (data) => {
  try {
    const response = await httpClient.post("/api/chat/create", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
