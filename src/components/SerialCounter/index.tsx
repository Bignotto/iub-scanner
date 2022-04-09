import React from "react";

import { Container, QuantityText, Title } from "./styles";

interface LastProductProps {
  quantity: number;
}

export default function SerialCounter({ quantity }: LastProductProps) {
  return (
    <Container>
      <Title>Total lido:</Title>
      <QuantityText>{quantity}</QuantityText>
    </Container>
  );
}
