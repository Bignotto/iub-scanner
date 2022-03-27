import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button } from "../../components/Button";

import { Container, ScreenTitle, Header, Content } from "./styles";
import { Alert } from "react-native";
import { ProductInfoCard } from "../../components/ProductInfoCard";

type RouteProps = {
  product: string;
};

type NavigationProps = {
  navigate: (screen: string, props: RouteProps) => void;
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

  function handleReadingButton() {
    navigation.navigate("Reading", {
      product: "NEW",
    });
  }

  async function handleCleanData() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      setSerialsData([]);
    } catch (error) {
      Alert.alert("Erro", "Erro ao limpar os dados.");
    }
  }
  return (
    <Container>
      <Header>
        <ScreenTitle>Inventário</ScreenTitle>
      </Header>
      <Content>
        {serialsData.map((p) => (
          <ProductInfoCard product={`${p.product}.....${p.quantity}`} />
        ))}
        <Button title="Leitura" onPress={handleReadingButton} />
        <Button title="Limpar" onPress={handleCleanData} />
        <Button title="Exportar" />
      </Content>
    </Container>
  );
};

export default Home;
