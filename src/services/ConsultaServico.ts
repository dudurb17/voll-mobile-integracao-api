import api from "./api";

export async function agendarConsulta(
  data: Date,
  especialistaId: string,
  pacienteId: string
) {
  try {
    const response = await api.post("/consulta", {
      especialista: especialistaId,
      paciente: pacienteId,
      data: data,
    });
    return response.data
  } catch (error) {
    console.log(error);
    return null;
  }
}
