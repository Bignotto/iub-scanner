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
import LastSerialAcuired from "../../components/LastSerialAcquired";
import SerialCounter from "../../components/SerialCounter";
import { SerialInfo } from "../../components/SerialInfo";
import { useScan } from "../../hooks/scan";
import { AsyncStorageSerialsRepository } from "../../repositories/SerialsRepository/AsyncStorageSerialsRepository";
import {
  Container,
  Header,
  ScreenTitle,
  Content,
  AcquiredSerialsContainer,
  Footer,
  TopInfoWrapper,
  RightBlockWrapper,
  LeftBlockWrapper,
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

      <Content>
        <TopInfoWrapper>
          <LeftBlockWrapper>
            <SerialCounter quantity={serialsData.length} />
          </LeftBlockWrapper>
          <RightBlockWrapper>
            <LastProductAcquired product={lastProduct} />
            <LastSerialAcuired serial={lastSerial} />
          </RightBlockWrapper>
        </TopInfoWrapper>
        <AcquiredSerialsContainer>
          {serialsData.map((s, i) => (
            //BIG: remove index from key parameter
            <SerialInfo
              serial={s.id}
              key={`${s.id}${i}`}
              handleDelete={handleDeleteSerial}
            />
          ))}
        </AcquiredSerialsContainer>
        <Button title="SCAN" onPress={() => navigation.navigate("Scan")} />
      </Content>
      <Footer>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </Footer>
    </Container>
  );
}
