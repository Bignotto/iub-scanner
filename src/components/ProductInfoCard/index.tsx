import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button } from "./Button";

import { Container, ProductInfoText, ButtonsWrapper } from "./styles";

interface ProductInfoCardProps {
  product: string;
  quantity?: number;
}

type RouteProps = {
  product: string;
};

type NavigationProps = {
  navigate: (screen: string, props: RouteProps) => void;
};

export function ProductInfoCard({ product, quantity }: ProductInfoCardProps) {
  const navigation = useNavigation<NavigationProps>();

  async function handleEditReading() {
    navigation.navigate("Reading", {
      product,
    });
  }

  return (
    <Container>
      <ProductInfoText>
        {product} - {quantity}
      </ProductInfoText>
      <ButtonsWrapper>
        <Button iconName="edit" onPress={handleEditReading} />
        <Button iconName="trash-2" />
      </ButtonsWrapper>
    </Container>
  );
}
