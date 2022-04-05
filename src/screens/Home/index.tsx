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
  const [serialsData, setSerialsData] = useState<Serial[]>([]);
  const [productsCounter, setProductsCounter] = useState<Map<string, number>>(
    new Map<string, number>()
  );

  async function loadSerials() {
    const dataKey = "@iubscanner/serials";
    // const productsCount: ProductCountProps = {};
    const newCounter = new Map<string, number>();

    const storageData = await AsyncStorage.getItem(dataKey);
    const serials: Serial[] = storageData ? JSON.parse(storageData) : [];

    // serialsData.forEach((s) => {
    //   const product = s.id.substring(0, 6);
    //   if (!productsCount[product]) productsCount[product] = 1;
    //   else productsCount[product]++;
    // });

    serialsData.forEach((s) => {
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
        {productsCounter.forEach((count, prod) => {
          console.log(count, prod);
          return <ProductInfoCard product={prod} quantity={count} key={prod} />;
        })}
        <Button title="Leitura" onPress={handleReadingButton} />
        <Button title="Limpar" onPress={handleCleanData} />
        <Button title="Exportar" />
      </Content>
    </Container>
  );
};

export default Home;
