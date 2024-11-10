import { VStack, Divider, ScrollView, useToast } from 'native-base'
import { Botao } from '../componentes/Botao'
import { CardConsulta } from '../componentes/CardConsulta'
import { Titulo } from '../componentes/Titulo'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { pegarConsultasPaciente } from '../services/PacienteServices'
import { deletConsulta } from '../services/ConsultaServico'

interface Especialista {
  id: string;
  nome: string;
  imagem: string;
  especialidade: string
}

interface Consulta {
  id: string;
  data: string;
  especialista: Especialista

}

export default function Consultas({ navigation }: any) {
  const toast = useToast()

  const [consultasProximas, setConsultasProximas] = useState<Consulta[]>([])
  const [consultasPassadas, setConsultasPassadas] = useState<Consulta[]>([])

  async function pegarConsultas() {
    const pacienteId = await AsyncStorage.getItem('pacienteId')
    if (!pacienteId) return;

    const todasConsultas: Consulta[] = await pegarConsultasPaciente(pacienteId) as unknown as Consulta[]
    const agora = new Date();

    const proximas = todasConsultas.filter((consulta) => new Date(consulta.data
    ) > agora)

    const passada = todasConsultas.filter((consulta) => new Date(consulta.data
    ) < agora)

    setConsultasPassadas(passada)
    setConsultasProximas(proximas)

  }

  useEffect(() => {
    pegarConsultas()
  },[])

  async function delet(id:string){
    try {
      const response = await deletConsulta(id)
      if(response){
        console.log(response)
        toast.show({
          title: 'Consulta cancelada com sucesso',
          backgroundColor: 'red.500',
        })
        pegarConsultas()
      }
    } catch (error) {
      toast.show({
        title: 'Algo deu errado',
        backgroundColor: 'red.500',
      })
    }
  }
  return (
    <ScrollView p="5">
      <Titulo color="blue.500">Minhas consultas</Titulo>
      <Botao mt={5} mb={5} onPress={()=>navigation.navigate('Explorar')}>Agendar nova consulta</Botao>
      <Botao mt={5} mb={5} onPress={()=>pegarConsultas()}>Atualizar</Botao>

      <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>Próximas consultas</Titulo>
      {consultasProximas?.map((consulta)=>(
        <CardConsulta
        key={consulta.id}
        nome={consulta?.especialista?.nome}
        especialidade={consulta?.especialista?.especialidade}
        foto={consulta?.especialista?.imagem}
        data={consulta?.data}
        onPress={()=>delet(consulta.id)}
        foiAgendado
      />
      ))}

      <Divider mt={5} />

      <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>Consultas passadas</Titulo>
      {consultasPassadas?.map((consulta)=>(
        <CardConsulta
        key={consulta.id}
        nome={consulta?.especialista?.nome}
        especialidade={consulta?.especialista?.especialidade}
        foto={consulta?.especialista?.imagem}
        data={consulta?.data}
        foiAtendido
      />
      ))}
    </ScrollView>
  )
}