import React from "react";

import { Container, SerialText } from "./styles";

interface LastSerialProps {
  serial: string;
}

export default function LastSerialAcuired({ serial }: LastSerialProps) {
  return (
    <Container>
      <SerialText>{serial}</SerialText>
    </Container>
  );
}
