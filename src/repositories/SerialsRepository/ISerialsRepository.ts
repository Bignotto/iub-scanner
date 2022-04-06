interface ISerialsRepository {
  create(data: string, product: string): Promise<Serial>;
  list(): Promise<Serial[]>;
  update(serial: string): Promise<Serial>;
  clear(): Promise<void>;
}
