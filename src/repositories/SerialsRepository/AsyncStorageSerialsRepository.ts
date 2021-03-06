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

  async list(): Promise<Serial[]> {
    const dataKey = "@iubscanner/serials";

    const storageData = await AsyncStorage.getItem(dataKey);
    const serials: Serial[] = storageData ? JSON.parse(storageData) : [];

    return serials;
  }

  async deleteByProduct(product: string): Promise<void> {
    const dataKey = "@iubscanner/serials";

    const serials = await this.list();

    const filteredSerials = serials.filter((s) => s.product !== product);

    await AsyncStorage.setItem(dataKey, JSON.stringify(filteredSerials));
  }

  update(serial: string): Promise<Serial> {
    throw new Error("Method not implemented.");
  }
  clear(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { AsyncStorageSerialsRepository };
