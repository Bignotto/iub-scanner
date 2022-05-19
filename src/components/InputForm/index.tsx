import React, { useState } from "react";
import { Alert } from "react-native";
import { useScan } from "../../hooks/scan";
import { Button } from "../Button";

import { Container, Input } from "./styles";

//TODO: implement input button action
export default function InputForm() {
  const [serial, setSerial] = useState("");
  const { handleScan } = useScan();

  async function handleSubmit() {
    if (serial.length !== 24) return Alert.alert("invalid serial");
    await handleScan(serial);
    setSerial("");
  }

  return (
    <Container>
      <Input
        placeholder="número de série"
        onSubmitEditing={handleSubmit}
        value={serial}
        onChangeText={(text) => setSerial(text)}
      />
      <Button title="Inserir" onPress={handleSubmit} />
    </Container>
  );
}
