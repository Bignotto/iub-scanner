import React, { useEffect, useState } from "react";
import { Text, Button, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { useScan } from "../../hooks/scan";

interface ScannerProps {
  type: string;
  data: string;
}

export default function ScannerComponent() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  const { handleScan } = useScan();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: ScannerProps) => {
    setScanned(true);
    await handleScan(data);
    navigation.goBack();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </>
  );
}
