import React from "react";
import { Button } from "./Button";

import { Container, ProductInfoText, ButtonsWrapper } from "./styles";

interface ProductInfoCardProps {
  product: string;
}

export function ProductInfoCard({ product }: ProductInfoCardProps) {
  return (
    <Container>
      <ProductInfoText>{product}.....10</ProductInfoText>
      <ButtonsWrapper>
        <Button iconName="edit" />
        <Button iconName="trash-2" />
      </ButtonsWrapper>
    </Container>
  );
}
