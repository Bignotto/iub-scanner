import { useNavigation } from "@react-navigation/native";
import React from "react";

import { Button } from "../../components/Button";

import { Container, ScreenTitle, Header, Content } from "./styles";

type NavigationProps = {
  navigate: (screen: string) => void;
};

const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  function handleButton() {
    navigation.navigate("Scanner");
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
