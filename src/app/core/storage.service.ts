import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  async store(storageKey: string, value: any){
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    await Storage.set({
      key: storageKey,
      value: encryptedValue
    });
  }

  async get(storageKey: string) {
    const ret = await Storage.get({ key: storageKey });
    console.log(ret)
    if (ret.value == null){
      return null
    } else {
      return JSON.parse(unescape(atob(ret.value)));
    }
  }

  async removeStorageItem(storageKey: string) {
    await Storage.remove({ key: storageKey });
  }

  async clear() {
    await Storage.clear();
  }

  async add(storageKey: string, value: any) {
    const ret = await Storage.get({ key: storageKey });
    if (ret.value != null){
      const test = JSON.parse(unescape(atob(ret.value)));
      test.push(...value);
      const encryptedValue = btoa(escape(JSON.stringify(test)));
      await Storage.set({
        key: storageKey,
        value: encryptedValue
      });
    } else {
      const encryptedValue = btoa(escape(JSON.stringify(value)));
      await Storage.set({
        key: storageKey,
        value: encryptedValue
      });
    }
  }

}
