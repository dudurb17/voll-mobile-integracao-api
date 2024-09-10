import { Image, Text, Box, ScrollView } from "native-base";
import { useState } from "react";
import Logo from "./assets/Logo.png";
import { Botao } from "./componentes/Botao";
import { EntradaTexto } from "./componentes/EntradaTexto";
import { Titulo } from "./componentes/Titulo";
import { secoes } from "./utils/CadastroEntradaTexto";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { cadastrarPaciente } from "./services/PacienteServices";

export default function Cadastro() {
  const [numSecao, setNumSecao] = useState(0);
  const [data, setData] = useState({} as any);
  const [planos, setPlanos] = useState([] as number[]);

  const handlePress = (id: number) => {
    setPlanos((prevPlanos) => {
      if (prevPlanos.includes(id)) {
        return prevPlanos.filter((planId) => planId !== id);
      } else {
        return [...prevPlanos, id];
      }
    });
  };

  const Checked = (id: number) => {
    return planos.includes(id);
  };

  function avancarSecao() {
    if (numSecao < secoes.length - 1) {
      setNumSecao(numSecao + 1);
    } else {
      console.log(data);
      cadastrar()
    }
  }

  function voltarSecao() {
    if (numSecao > 0) {
      setNumSecao(numSecao - 1);
    }
  }

  function updateData(id: string, valor: string) {
    setData({ ...data, [id]: valor });
  }

  async function cadastrar() {
    console.log(data);
    const response = await cadastrarPaciente({
      cpf: data.cpf,
      nome: data.nome,
      email: data.email,
      endereco: {
        cep: data.cep,
        rua: data.rua,
        numero: data.numero,
        estado: data.estado,
        complemento: data.complemento,
      },
      senha: data.senha,
      telefone: data.telefone,
      possuiPlanoSaude: planos.length > 0,
      planosSaude: planos,
      imagem: data.imagem,
    });

    if(!response){
      console.log("error")
    }
  }

  return (
    <ScrollView flex={1} p={5}>
      <Image source={Logo} alt="Logo Voll" alignSelf="center" />

      <Titulo>{secoes[numSecao].titulo}</Titulo>
      <Box>
        {secoes[numSecao]?.entradaTexto?.map((entrada) => {
          return (
            <EntradaTexto
              label={entrada.label}
              placeholder={entrada.placeholder}
              key={entrada.id}
              secureTextEntry={entrada.secureTextEntry}
              value={data[entrada.name]}
              onChangeText={(text) => updateData(entrada.name, text)}
            />
          );
        })}
      </Box>
      <Box>
        {numSecao == 2 && (
          <Text color="blue.800" fontWeight="bold" fontSize="md" mt="2" mb={2}>
            Selecione o plano:
          </Text>
        )}
        {secoes[numSecao].checkbox.map((checkbox) => {
          return (
            <TouchableOpacity
              onPress={() => handlePress(checkbox.id)}
              style={styles.container}
              key={checkbox.id}
            >
              <View
                style={[
                  styles.checkbox,
                  Checked(checkbox.id) && styles.checked,
                ]}
              >
                {Checked(checkbox.id) && <View style={styles.innerCheck} />}
              </View>
              <Text style={styles.label}>{checkbox.value}</Text>
            </TouchableOpacity>
          );
        })}
      </Box>
      {numSecao > 0 && (
        <Botao onPress={() => voltarSecao()} bgColor="gray.400">
          Voltar
        </Botao>
      )}
      <Botao onPress={() => avancarSecao()} mt={4} mb={20}>
        {numSecao==2 ?"Finalizar": "Avançar"}
      </Botao>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#4F46E5",
  },
  innerCheck: {
    width: 12,
    height: 12,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  label: {
    fontSize: 16,
    color: "black",
  },
});
