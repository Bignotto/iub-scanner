import React from "react";
import { Button } from "../../components/Button";
import ScannerComponent from "../../components/ScannerComponent";
import {
  Container,
  Header,
  ScreenTitle,
  ScannerWrapper,
  Footer,
} from "./styles";

export default function Scanner() {
  return (
    <Container>
      <Header>
        <ScreenTitle>Leitura</ScreenTitle>
      </Header>
      <ScannerWrapper>
        <ScannerComponent />
      </ScannerWrapper>
      <Footer>
        <Button title="Voltar" />
      </Footer>
    </Container>
  );
}
