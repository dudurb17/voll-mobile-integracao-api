import api from "./api";

export async function buscarEspecialistaPorEstado(
  estado: string,
  especialidade: string
) {
  try {
    const response = await api.get("/especialista/busca", {
      params: { estado, especialidade },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
