interface ISerialsRepository {
  create(data: string, product: string): Promise<Serial>;
  update(serial: string): Promise<Serial>;
  clear(): Promise<void>;
}
