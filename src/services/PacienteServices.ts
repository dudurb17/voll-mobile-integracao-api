import { err } from "react-native-svg/lib/typescript/xml";
import api from "./api";
import { Paciente } from "../interfaces/Paciete";

export async function cadastrarPaciente(paciente: Paciente) {
  if (!paciente) return null;

  try {
    const response = await api.post("/paciente", paciente);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function pegarDadosPaciente(id: string): Promise<Paciente | null> {
  try {
    const response = await api.get(`/paciente/${id}`);
    return response.data as Paciente;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function pegarConsultasPaciente(id: string): Promise<Paciente | null> {
  try {
    const response = await api.get(`/paciente/${id}/consultas`);
    return response.data as Paciente;
  } catch (error) {
    console.log(error);
    return null;
  }
}
