import React from "react";
import { IconButton } from "../IconButton";

import { Container, ProductInfoText, ButtonsWrapper } from "./styles";

interface ProductInfoCardProps {
  product: string;
  quantity?: number;
  handleDelete(product: string): Promise<void>;
  handleEdit(product: string): void;
}

export function ProductInfoCard({
  product,
  quantity,
  handleDelete,
  handleEdit,
}: ProductInfoCardProps) {
  return (
    <Container>
      <ProductInfoText>
        {product} - {quantity}
      </ProductInfoText>
      <ButtonsWrapper>
        <IconButton iconName="edit" onPress={() => handleEdit(product)} />
        <IconButton iconName="trash-2" onPress={() => handleDelete(product)} />
      </ButtonsWrapper>
    </Container>
  );
}
