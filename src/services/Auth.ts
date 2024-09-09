import api from "./api";

export async function SignIn(email: string, senha: string) {
  if (!email || !senha) return null;

  try {
    const response = await api.post("/auth/login", {
      email,
      senha,
    });

    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
