import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert } from "react-native";
import { Button } from "../../components/Button";
import ScannerComponent from "../../components/ScannerComponent";
import {
  Container,
  Header,
  ScreenTitle,
  ScannerWrapper,
  Footer,
} from "./styles";

export default function Reading() {
  const navigation = useNavigation();

  async function handleScan(scannedText: string) {
    console.log({ scannedText });
    if (scannedText.length !== 24) {
      return Alert.alert("Inválido", "Código de barras inválido");
    }
  }

  return (
    <Container>
      <Header>
        <ScreenTitle>Leitura</ScreenTitle>
      </Header>
      <ScannerWrapper>
        <ScannerComponent handleScan={handleScan} />
      </ScannerWrapper>
      <Footer>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </Footer>
    </Container>
  );
}
