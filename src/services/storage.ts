import { AsyncStorage } from 'react-native';

const wrapKey = (key: string) => `@kraken-trader:${key}`;

export const setItem = <TVal>(key: string, val: TVal) =>
  AsyncStorage.setItem(wrapKey(key), JSON.stringify(val));


export const getItem = async <TVal>(key: string, defaultVal: TVal): Promise<TVal> => {
  try {
    console.log('before', wrapKey(key));
    const valStr = await AsyncStorage.getItem(wrapKey(key));
    console.log('after', valStr, wrapKey(key));
    if (valStr !== null) {
      return JSON.parse(valStr);
    }
  } catch (err) {
    console.log('errror', err);
    return defaultVal;
  }
};

export const removeItem = (key: string) =>
  AsyncStorage.removeItem(wrapKey(key));