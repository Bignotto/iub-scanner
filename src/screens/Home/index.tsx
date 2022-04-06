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

interface ProductCountProps {
  [key: string]: number;
}

const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [productsCounter, setProductsCounter] = useState<Map<string, number>>(
    new Map<string, number>()
  );

  async function loadSerials() {
    const newCounter = new Map<string, number>();
    const dataKey = "@iubscanner/serials";

    const storageData = await AsyncStorage.getItem(dataKey);
    const serials: Serial[] = storageData ? JSON.parse(storageData) : [];

    serials.forEach((s) => {
      const product = s.id.substring(0, 6);
      const actCount = newCounter.get(product);

      if (!actCount) {
        newCounter.set(product, 1);
        return;
      }

      newCounter.set(product, actCount + 1);
    });

    console.log({ newCounter, serials });
    setProductsCounter(newCounter);
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
        {[...productsCounter.keys()].map((prod) => (
          <ProductInfoCard
            product={prod}
            quantity={productsCounter.get(prod)}
            key={prod}
          />
        ))}
        <Button title="Leitura" onPress={handleReadingButton} />
        <Button title="Limpar" onPress={handleCleanData} />
        <Button title="Exportar" />
      </Content>
    </Container>
  );
};

export default Home;
