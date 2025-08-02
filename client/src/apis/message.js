import { httpClient } from "./client";

export const getMessagesForChat = async (id) => {
  try {
    const response = await httpClient.get(`/api/message/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const message = async (data) => {
  try {
    const response = await httpClient.post("/api/message/send", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
