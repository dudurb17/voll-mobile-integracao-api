import { VStack, Text, ScrollView, Avatar, Divider } from "native-base";
import { Titulo } from "../componentes/Titulo";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pegarDadosPaciente } from "../services/PacienteServices";
import { Paciente } from "../interfaces/Paciete";
import { Botao } from "../componentes/Botao";

export default function Perfil({navigation}:any) {
  const [dadosPaciente, setDadosPaciente] = useState<Paciente>({} as Paciente);

  useEffect(() => {
    async function dadosPaciente() {
      const pacienteId = await AsyncStorage.getItem("pacienteId");
      if (!pacienteId) return null;
      const response = await pegarDadosPaciente(pacienteId);

      if (response) {
        setDadosPaciente(response);
        console.log(response);
      }
    }
    dadosPaciente();
  }, []);

  function deslogar(){
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('pacienteId')
    navigation.replace('Login')

  }
  return (  
    <ScrollView flex={1}>
      <VStack flex={1} alignItems="center" p={5}>
        <Titulo color="blue.500">Meu Perfil</Titulo>

        <Avatar
          size="xl"
          source={{ uri: "https://github.com/dudurb17.png" }}
          mt={5}
        />

        <Titulo color="blue.500">Informações pessoais</Titulo>
        <Titulo fontSize="lg" mb={1}>
          {dadosPaciente?.nome}
        </Titulo>
        <Text>{dadosPaciente?.email}</Text>
        <Text>{dadosPaciente.endereco?.estado}</Text>

        <Divider mt={5} />

        <Titulo color="blue.500" mb={1}>
          Planos de saude
        </Titulo>
        {dadosPaciente.planosSaude?.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
        <Botao onPress={deslogar}>Deslogar</Botao>
      </VStack>
    </ScrollView>
  );
}
