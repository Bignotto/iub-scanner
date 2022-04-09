import React from "react";

import { Container, ProductText, Title } from "./styles";

interface LastProductProps {
  product: string;
}

export default function LastProductAcquired({ product }: LastProductProps) {
  return (
    <Container>
      <Title>Último produto lido:</Title>
      <ProductText>{product}</ProductText>
    </Container>
  );
}
