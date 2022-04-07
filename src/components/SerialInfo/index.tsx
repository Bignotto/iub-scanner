import React from "react";
import { IconButton } from "../IconButton";

import {
  Container,
  ButtonsWrapper,
  ProductText,
  DateText,
  TimeText,
  SeqText,
  SerialWrapper,
} from "./styles";

interface ProductInfoCardProps {
  serial: string;
  handleDelete(product: string): Promise<void>;
}

export function SerialInfo({ serial, handleDelete }: ProductInfoCardProps) {
  return (
    <Container>
      <SerialWrapper>
        <ProductText>{serial.substring(0, 6)}</ProductText>
        <DateText>{serial.substring(6, 14)}</DateText>
        <TimeText>{serial.substring(14, 20)}</TimeText>
        <SeqText>{serial.substring(20, 24)}</SeqText>
      </SerialWrapper>
      <ButtonsWrapper>
        <IconButton iconName="trash-2" onPress={() => handleDelete(serial)} />
      </ButtonsWrapper>
    </Container>
  );
}
