class LocalStorageService {
  private store: Storage = localStorage;

  set(key: string, value: string) {
    this.store.setItem(key, value);
  }

  delete(key: string) {
    this.store.removeItem(key);
  }

  get(key: string) {
    return this.store.getItem(key);
  }

  has(key: string) {
    return !!this.store.getItem(key);
  }
}

const localStorageService = new LocalStorageService();

export default localStorageService;
