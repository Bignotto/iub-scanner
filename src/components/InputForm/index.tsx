import React, { useState } from "react";
import { Alert } from "react-native";
import { Button } from "../Button";

import { Container, Input } from "./styles";

//TODO: implement input button action
export default function InputForm() {
  const [serial, setSerial] = useState("");

  function handleSubmit() {
    Alert.alert("enter key pressed!");
  }

  return (
    <Container>
      <Input placeholder="número de série" onSubmitEditing={handleSubmit} />
      <Button title="Inserir" onPress={handleSubmit} />
    </Container>
  );
}
