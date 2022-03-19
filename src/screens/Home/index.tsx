import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button } from "../../components/Button";

import { Container, ScreenTitle, Header, Content } from "./styles";

type NavigationProps = {
  navigate: (screen: string) => void;
};

interface ISerialDataProps {
  product: string;
  quantity: number;
}

const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [serialsData, setSerialsData] = useState<ISerialDataProps[]>([]);

  async function loadSerials() {
    const dataKey = "@iubscanner/serials";

    const storageData = await AsyncStorage.getItem(dataKey);
    const serials: ISerialDataProps[] = storageData
      ? JSON.parse(storageData)
      : [];

    console.log(serials);
    setSerialsData(serials);
  }

  useEffect(() => {
    loadSerials();
  }, []);

  function handleButton() {
    navigation.navigate("Reading");
  }
  return (
    <Container>
      <Header>
        <ScreenTitle>Inventário</ScreenTitle>
      </Header>
      <Content>
        <Button title="Botão de ação!" onPress={handleButton} />
        <Button title="Botão de ação!" />
        <Button title="Botão de ação!" />
      </Content>
    </Container>
  );
};

export default Home;
