import axios from "axios";

export const httpClient = axios.create({
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});
