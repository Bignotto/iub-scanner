interface ISerialsRepository {
  create(data: string): Promise<Serial>;
  update(serial: string): Promise<Serial>;
  clear(): Promise<void>;
}
