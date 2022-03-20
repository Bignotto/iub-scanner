import React from "react";

import {
  Container,
  ProductInfoText,
  ButtonsWrapper,
  EditButton,
  DeleteButton,
  Icon,
} from "./styles";

interface ProductInfoCardProps {
  product: string;
}

export function ProductInfoCard({ product }: ProductInfoCardProps) {
  return (
    <Container>
      <ProductInfoText>{product}.....10</ProductInfoText>
      <ButtonsWrapper>
        <Icon name="edit" />
        <Icon name="trash-2" />
      </ButtonsWrapper>
    </Container>
  );
}
