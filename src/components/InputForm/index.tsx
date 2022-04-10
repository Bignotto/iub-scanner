import React from "react";
import { Button } from "../Button";

import { Container, Input } from "./styles";

//TODO: implement input button action
export default function InputForm() {
  return (
    <Container>
      <Input placeholder="número de série" />
      <Button title="Inserir" />
    </Container>
  );
}
