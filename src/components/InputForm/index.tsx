import React, { useState } from "react";
import { Button } from "../Button";

import { Container, Input } from "./styles";

//TODO: implement input button action
export default function InputForm() {
  const [serial, setSerial] = useState("");

  function handleSubmit() {}

  return (
    <Container>
      <form>
        <Input placeholder="número de série" />
        <Button title="Inserir" />
      </form>
    </Container>
  );
}
