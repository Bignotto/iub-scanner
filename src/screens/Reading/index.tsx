import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [serialsData, setSerialsData] = useState<Serial[]>([]);

  async function loadSerials() {
    if (product === "NEW") {
      setSerialsData([]);
      return;
    }

    const dataKey = `@iubscanner/serials/${product}`;
    const storageData = await AsyncStorage.getItem(dataKey);
    const serials: Serial[] = storageData ? JSON.parse(storageData) : [];

    console.log(serials);
    setSerialsData(serials);
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
