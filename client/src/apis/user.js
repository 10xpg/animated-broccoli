import { httpClient } from "./client";

export const getLoggedInUser = async () => {
  try {
    const response = await httpClient.get("/api/user/active-user");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await httpClient.get("/api/user/");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
