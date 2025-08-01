import { httpClient } from "./client";

export const signupUser = async (data) => {
  try {
    const response = await httpClient.post("/api/auth/signup", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await httpClient.post("/api/auth/login", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
