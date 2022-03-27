import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Button } from "../../components/Button";
import { useScan } from "../../hooks/scan";
import {
  Container,
  Header,
  ScreenTitle,
  ScannerWrapper,
  ReadingInfoContainer,
  SerialNumber,
  Footer,
} from "./styles";

type NavigationProps = {
  navigate: (screen: string) => void;
  goBack: () => void;
};

type ReadingProps = {
  Reading: {
    product: string;
  };
};

export default function Reading() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<ReadingProps, "Reading">>();

  const { product } = route.params;
  const { serials } = useScan();

  return (
    <Container>
      <Header>
        <ScreenTitle>Leitura</ScreenTitle>
      </Header>
      <ScannerWrapper>
        <ReadingInfoContainer>
          {serials.map((s, i) => (
            <SerialNumber key={`${s.id}${i}`}> {s.id} </SerialNumber>
          ))}
        </ReadingInfoContainer>
        <Button title="SCAN" onPress={() => navigation.navigate("Scan")} />
      </ScannerWrapper>
      <Footer>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </Footer>
    </Container>
  );
}
