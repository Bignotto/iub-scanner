import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

import { Button } from "../../components/Button";
import { useScan } from "../../hooks/scan";
import { AsyncStorageSerialsRepository } from "../../repositories/SerialsRepository/AsyncStorageSerialsRepository";
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
  const serialsRepository = new AsyncStorageSerialsRepository();

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<ReadingProps, "Reading">>();
  const { product } = route.params;
  const [serialsData, setSerialsData] = useState<Serial[]>([]);

  //TODO: filter logic should move to a repository function
  async function loadSerials() {
    const serials = await serialsRepository.list();

    if (product === "NEW") return setSerialsData(serials);

    const productSerials = serials.filter((s) => s.product === product);
    setSerialsData(productSerials);
  }

  useEffect(() => {
    loadSerials();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSerials();
    }, [])
  );

  return (
    <Container>
      <Header>
        <ScreenTitle>Leitura</ScreenTitle>
      </Header>
      <ScannerWrapper>
        <ReadingInfoContainer>
          {serialsData.map((s, i) => (
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
