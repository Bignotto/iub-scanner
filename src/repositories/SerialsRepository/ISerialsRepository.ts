interface ISerialsRepository {
  create(data: string, product: string): Promise<Serial>;
  list(): Promise<Serial[]>;
  deleteByProduct(product: string): Promise<void>;
  update(serial: string): Promise<Serial>;
  clear(): Promise<void>;
}
