import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button } from "./Button";

import { Container, ProductInfoText, ButtonsWrapper } from "./styles";

interface ProductInfoCardProps {
  product: string;
  quantity?: number;
  handleDelete(product: string): Promise<void>;
  handleEdit(product: string): void;
}

type RouteProps = {
  product: string;
};

type NavigationProps = {
  navigate: (screen: string, props: RouteProps) => void;
};

export function ProductInfoCard({
  product,
  quantity,
  handleDelete,
  handleEdit,
}: ProductInfoCardProps) {
  const navigation = useNavigation<NavigationProps>();

  // async function handleEditReading() {
  //   navigation.navigate("Reading", {
  //     product,
  //   });
  // }

  return (
    <Container>
      <ProductInfoText>
        {product} - {quantity}
      </ProductInfoText>
      <ButtonsWrapper>
        <Button iconName="edit" onPress={() => handleEdit(product)} />
        <Button iconName="trash-2" onPress={() => handleDelete(product)} />
      </ButtonsWrapper>
    </Container>
  );
}
