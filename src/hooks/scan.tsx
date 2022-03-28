import { createContext, ReactNode, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Alert } from "react-native";

interface ScanProviderProps {
  children: ReactNode;
}

interface SerialDataProps {
  product: string;
  quantity: number;
}

interface IScanContextData {
  isLoading: boolean;
  handleScan(scannedText: string): Promise<void>;
  serials: Serial[];
}

const ScanContext = createContext({} as IScanContextData);

function ScanProvider({ children }: ScanProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [serials, setSerials] = useState<Serial[]>([]);
  const [product, setProduct] = useState("");

  //TODO: move this logic eslewhere
  async function updateProductCount(product: string) {
    const dataKey = "@iubscanner/serials";
    const storageData = await AsyncStorage.getItem(dataKey);
    const storedProducts: SerialDataProps[] = storageData
      ? JSON.parse(storageData)
      : [];

    if (storedProducts.length === 0) {
      const newProductData: SerialDataProps = {
        product,
        quantity: 1,
      };
      return await AsyncStorage.setItem(
        dataKey,
        JSON.stringify([newProductData])
      );
    }

    const found = storedProducts.find((s) => s.product === product);
    if (!found) {
      const newProductData: SerialDataProps = {
        product,
        quantity: 1,
      };
      const newProductsData = [...storedProducts, newProductData];

      return await AsyncStorage.setItem(
        dataKey,
        JSON.stringify(newProductsData)
      );
    }

    const newProductData: SerialDataProps = {
      product,
      quantity: found.quantity + 1,
    };

    const oldProducts = storedProducts.filter((s) => s.product !== product);
    const newProductsData = [...oldProducts, newProductData];

    return await AsyncStorage.setItem(dataKey, JSON.stringify(newProductsData));
  }

  async function handleScan(scannedText: string) {
    setIsLoading(true);
    if (scannedText.length !== 24) {
      return Alert.alert("Inválido", "Código de barras inválido");
    }
    //I00046201911011514180047
    const scannedProduct = scannedText.substring(0, 6);
    const dataKey = `@iubscanner/serials/${scannedProduct}`;

    if (product !== scannedProduct && product.length !== 0)
      return Alert.alert(
        "Inválido",
        "Você não pode ler produtos diferentes na mesma leitura!"
      );
    setProduct(scannedProduct);

    const newSerial: Serial = {
      id: scannedText,
      product: scannedProduct,
    };

    try {
      // await AsyncStorage.clear();
      await updateProductCount(scannedProduct);
      const storageData = await AsyncStorage.getItem(dataKey);
      const storageSerials = storageData ? JSON.parse(storageData) : [];

      const newSerials = [...storageSerials, newSerial];

      //TODO: check for duplicated serials

      setSerials(newSerials);
      await AsyncStorage.setItem(dataKey, JSON.stringify(newSerials));
    } catch (error) {
      console.log(error);
      Alert.alert("Algum proglema com async storage");
    } finally {
      setIsLoading(false);
    }

    return Alert.alert("Válido!", `produto ${product}`);
  }

  return (
    <ScanContext.Provider value={{ isLoading, handleScan, serials }}>
      {children}
    </ScanContext.Provider>
  );
}

function useScan() {
  return useContext(ScanContext);
}

export { ScanProvider, useScan };
