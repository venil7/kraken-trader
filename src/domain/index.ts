export type Currency = string;
export type Balance = { symbol: Currency, balance: number };

export enum Status {
  Open = "open",
  Closed = "closed",
  Cancelled = "cancelled",
};

export enum OrderType {
  Sell = "sell",
  Buy = "buy",
};

export type Order = {
  id: string;
  refid: string | null,
  userref: number,
  status: Status,
  opentm: Date,
  starttm: Date,
  expiretm: Date,
  descr: {
    pair: string,
    type: OrderType,
    ordertype: string,
    price: number,
    price2: number,
    leverage: string,
    order: string,
    close: string
  },
  vol: number,
  vol_exec: number,
  cost: number,
  fee: number,
  price: number,
  stopprice: number,
  limitprice: number,
  misc: string,
  oflags: string
};
