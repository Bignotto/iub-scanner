import AsyncStorage from "@react-native-async-storage/async-storage";

class AsyncStorageSerialsRepository implements ISerialsRepository {
  async create(data: string, product: string): Promise<Serial> {
    const dataKey = "@iubscanner/serials";
    const newSerial: Serial = {
      id: data,
      product,
      timestamp: new Date().getTime(),
    };

    try {
      const storageData = await AsyncStorage.getItem(dataKey);
      const storageSerials = storageData ? JSON.parse(storageData) : [];
      const newSerials = [...storageSerials, newSerial];
      await AsyncStorage.setItem(dataKey, JSON.stringify(newSerials));

      return Promise.resolve(newSerial);
    } catch (error) {
      throw new Error("error saving serials on async storage");
    }
  }
  update(serial: string): Promise<Serial> {
    throw new Error("Method not implemented.");
  }
  clear(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { AsyncStorageSerialsRepository };
