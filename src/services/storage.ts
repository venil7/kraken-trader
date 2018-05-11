import AsyncStorage from 'rn-async-storage';

const wrapKey = (key: string) => `@kraken-trader:${key}`;

export const setItem = <TVal>(key: string, val: TVal) =>
  AsyncStorage.setItem(wrapKey(key), JSON.stringify(val));


export const getItem = async <TVal>(key: string, getDefaultVal: () => TVal): Promise<TVal> => {
  const valStr = await AsyncStorage.getItem(wrapKey(key));
  return (valStr !== null)
    ? JSON.parse(valStr)
    : getDefaultVal();
};
