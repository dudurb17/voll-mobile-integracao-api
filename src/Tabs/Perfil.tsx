import { VStack, Text, ScrollView, Avatar, Divider } from 'native-base'
import { Titulo } from '../componentes/Titulo'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { pegarDadosPaciente } from '../services/PacienteServices'

export default function Perfil(){
  const [dadosPaciente, setDadosPaciente] =useState({})

  useEffect(()=>{
    async function dadosPaciente() {
      const pacienteId= await AsyncStorage.getItem('pacientId')
     if(!pacienteId) return null
      const responste =await pegarDadosPaciente(pacienteId);

      if(responste){
        setDadosPaciente(responste)
        console.log(responste)
      }
    }
    dadosPaciente()
  }, [])
  return(
    <ScrollView flex={1}>
      <VStack flex={1} alignItems="center" p={5}>
        <Titulo color="blue.500">Meu Perfil</Titulo>

        <Avatar size="xl" source={{ uri: "https://github.com/andreocunha.png" }} mt={5} />

        <Titulo color="blue.500">Informações pessoais</Titulo>
        <Titulo fontSize="lg" mb={1}>{dadosPaciente.nome}</Titulo>
        <Text>12/12/1990</Text>
        <Text>São Paulo</Text>

        <Divider mt={5} />

        <Titulo color="blue.500" mb={1}>Histórico médico</Titulo>
        <Text>Bronquite</Text>
        <Text>Sinusite</Text>
      </VStack>
    </ScrollView>
  )
}