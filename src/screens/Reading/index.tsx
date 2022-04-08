import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

import { Button } from "../../components/Button";
import LastProductAcquired from "../../components/LastProductAcquired";
import { SerialInfo } from "../../components/SerialInfo";
import { useScan } from "../../hooks/scan";
import { AsyncStorageSerialsRepository } from "../../repositories/SerialsRepository/AsyncStorageSerialsRepository";
import {
  Container,
  Header,
  ScreenTitle,
  ScannerWrapper,
  ReadingInfoContainer,
  Footer,
  TopInfoWrapper,
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
  //TODO: move repository dependency from screen implementation
  const serialsRepository = new AsyncStorageSerialsRepository();

  const { getLast } = useScan();

  const { lastSerial, lastProduct } = getLast();

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

  async function handleDeleteSerial(serial: string) {
    Alert.alert("deveria apagar", `o produto: ${serial}`);
  }
  return (
    <Container>
      <Header>
        <ScreenTitle>Leitura</ScreenTitle>
      </Header>

      <ScannerWrapper>
        <TopInfoWrapper>
          <LastProductAcquired product={lastProduct} />
        </TopInfoWrapper>
        <ReadingInfoContainer>
          {serialsData.map((s) => (
            <SerialInfo
              serial={s.id}
              key={s.id}
              handleDelete={handleDeleteSerial}
            />
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
