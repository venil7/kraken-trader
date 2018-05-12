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

export enum CurrencyType {
  Fiat = 0,
  Crypto = 1
};

export enum Symbol {
  BCH = "BCH",
  DASH = "DASH",
  EOS = "EOS",
  GNO = "GNO",
  KFEE = "KFEE",
  USDT = "USDT",
  DAO = "XDAO",
  ETC = "XETC",
  ETH = "XETH",
  ICN = "XICN",
  LTC = "XLTC",
  MLN = "XMLN",
  NMC = "XNMC",
  REP = "XREP",
  XBT = "XXBT",
  XDG = "XXDG",
  XLM = "XXLM",
  XMR = "XXMR",
  XRP = "XXRP",
  XVN = "XXVN",
  ZEC = "XZEC",
  CAD = "ZCAD",
  EUR = "ZEUR",
  GBP = "ZGBP",
  JPY = "ZJPY",
  KRW = "ZKRW",
  USD = "ZUSD",
};

export enum Pair {
  BCH_EUR = "BCHEUR",
  BCH_USD = "BCHUSD",
  BCH_XBT = "BCHXBT",
  DASH_EUR = "DASHEUR",
  DASH_USD = "DASHUSD",
  DASH_XBT = "DASHXBT",
  EOS_ETH = "EOSETH",
  EOS_EUR = "EOSEUR",
  EOS_USD = "EOSUSD",
  EOS_XBT = "EOSXBT",
  GNO_ETH = "GNOETH",
  GNO_EUR = "GNOEUR",
  GNO_USD = "GNOUSD",
  GNO_XBT = "GNOXBT",
  USDT_USD = "USDTZUSD",
  ETC_ETH = "XETCXETH",
  ETC_XXBT = "XETCXXBT",
  ETC_EUR = "XETCZEUR",
  ETC_USD = "XETCZUSD",
  ETH_XBT = "XETHXXBT",
  ETH_XBT_d = "XETHXXBT.d",
  ETH_CAD = "XETHZCAD",
  ETH_CAD_d = "XETHZCAD.d",
  ETH_EUR = "XETHZEUR",
  ETH_EUR_d = "XETHZEUR.d",
  ETH_GBP = "XETHZGBP",
  ETH_GBP_d = "XETHZGBP.d",
  ETH_JPY = "XETHZJPY",
  ETH_JPY_d = "XETHZJPY.d",
  ETH_USD = "XETHZUSD",
  ETHZ_USD_d = "XETHZUSD.d",
  ICN_ETH = "XICNXETH",
  ICN_XBT = "XICNXXBT",
  LTC_XBT = "XLTCXXBT",
  LTC_EUR = "XLTCZEUR",
  LTC_USD = "XLTCZUSD",
  MLN_ETH = "XMLNXETH",
  MLN_XBT = "XMLNXXBT",
  REP_ETH = "XREPXETH",
  REP_XBT = "XREPXXBT",
  REP_EUR = "XREPZEUR",
  REP_USD = "XREPZUSD",
  XBT_CAD = "XXBTZCAD",
  XBT_CAD_d = "XXBTZCAD.d",
  XBT_EUR = "XXBTZEUR",
  XBT_EUR_d = "XXBTZEUR.d",
  XBT_GBP = "XXBTZGBP",
  XBT_GBP_d = "XXBTZGBP.d",
  XBT_JPY = "XXBTZJPY",
  XBT_JPY_d = "XXBTZJPY.d",
  XBT_USD = "XXBTZUSD",
  XBT_USD_d = "XXBTZUSD.d",
  XDG_XBT = "XXDGXXBT",
  XLM_XBT = "XXLMXXBT",
  XLM_EUR = "XXLMZEUR",
  XLM_USD = "XXLMZUSD",
  XMR_XBT = "XXMRXXBT",
  XMR_EUR = "XXMRZEUR",
  XMR_USD = "XXMRZUSD",
  XRP_XBT = "XXRPXXBT",
  XRP_CAD = "XXRPZCAD",
  XRP_EUR = "XXRPZEUR",
  XRP_JPY = "XXRPZJPY",
  XRP_USD = "XXRPZUSD",
  ZEC_XBT = "XZECXXBT",
  ZEC_EUR = "XZECZEUR",
  ZEC_JPY = "XZECZJPY",
  ZEC_USD = "XZECZUSD"
};

export type Order = {
  id: string;
  refid: string | null,
  userref: number,
  status: Status,
  opentm: number,
  starttm: number,
  expiretm: number,
  descr: {
    pair: Pair,
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

export type Asset = {
  symbol: Symbol;
  type: CurrencyType,
  aclass: string;
  altname: string;
  decimals: number;
  display_decimals: number;
};

export type TradableAssetPair = {
  pair: Pair,
  altname: string;
  aclass_base: string;
  base: Symbol;
  aclass_quote: string;
  quote: Symbol;
  lot: string;
  pair_decimals: number;
  lot_decimals: number;
  lot_multiplier: number;
  leverage_buy: any[];
  leverage_sell: any[];
  fees: [number, number][];
  fees_maker: [number, number][];
  fee_volume_currency: string;
  margin_call: number;
  margin_stop: number;
};

export type Ticker = {
  pair: Pair,
  ask: number;
  bid: number;
  last: number;
  volume: number;
  volumeWeightedAverage: number;
  numberOfTrades: number;
  low: number;
  high: number;
  opening: number
};


export enum Interval {
  Minute = 1,
  FiveMinutes = 5,
  FifteenMinutes = 15,
  HalfAnHour = 30,
  Hour = 60,
  ThreeHours = 240,
  Day = 1440,
  Week = 10080,
  TwoWeeks = 21600
};

export type OhlcRow = {
  pair: Pair;
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  vwap: number;
  volume: number;
  count: number;
};