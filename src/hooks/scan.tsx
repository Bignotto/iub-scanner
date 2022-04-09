import { createContext, ReactNode, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Alert } from "react-native";
import { AsyncStorageSerialsRepository } from "../repositories/SerialsRepository/AsyncStorageSerialsRepository";

interface ScanProviderProps {
  children: ReactNode;
}

interface IScanContextData {
  isLoading: boolean;
  handleScan(scannedText: string): Promise<void>;
  getLast(): { lastSerial: string; lastProduct: string };
}

const ScanContext = createContext({} as IScanContextData);
const serialsRepository = new AsyncStorageSerialsRepository();

function ScanProvider({ children }: ScanProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [lastProduct, setLastProduct] = useState("");
  const [lastSerial, setLastSerial] = useState("");

  //TODO: move serial validation from here to domain layer
  async function handleScan(scannedText: string) {
    setIsLoading(true);
    if (scannedText.length !== 24) {
      return Alert.alert("Inválido", "Código de barras inválido");
    }
    const scannedProduct = scannedText.substring(0, 6);

    try {
      await serialsRepository.create(scannedText, scannedProduct);
    } catch (error) {
      console.log(error);
      Alert.alert("Algum proglema com async storage");
    } finally {
      setIsLoading(false);
    }
    setLastProduct(scannedProduct);
    setLastSerial(scannedText);
    return Alert.alert("Válido!", `Produto ${scannedProduct}`);
  }

  function getLast() {
    return {
      lastSerial,
      lastProduct,
    };
  }

  return (
    <ScanContext.Provider value={{ isLoading, handleScan, getLast }}>
      {children}
    </ScanContext.Provider>
  );
}

function useScan() {
  return useContext(ScanContext);
}

export { ScanProvider, useScan };
