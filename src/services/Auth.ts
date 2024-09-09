import { err } from "react-native-svg/lib/typescript/xml";
import api from "./api";

export async function login(email: string, password: string) {
  if (!email || !password) return null;

  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
