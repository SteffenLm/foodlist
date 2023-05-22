import { inject } from '@angular/core';
import { LOCAL_STORAGE, LOCAL_STORAGE_KEY } from './local-storage.token';

export abstract class LocalStorage<T> {
  private items: T[];
  private readonly localStorage = inject(LOCAL_STORAGE);
  private readonly key = inject(LOCAL_STORAGE_KEY);

  constructor() {
    const localStorageItems = this.localStorage.getItem(this.key);
    if (localStorageItems === null) {
      this.items = [];
    } else {
      this.items = JSON.parse(localStorageItems);
    }
  }

  protected setData(items: T[]): void {
    this.localStorage.setItem(this.key, JSON.stringify(items));
    this.items = items.slice(0);
  }

  protected getData(): T[] {
    return this.items.slice(0);
  }
}
