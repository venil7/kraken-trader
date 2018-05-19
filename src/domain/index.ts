export type Balance = {
  symbol: Symbol,
  balance: number
};

export enum Status {
  Open = "open",
  Closed = "closed",
  Canceled = "canceled",
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
  USDT_USD = "USDTUSD",
  ETC_ETH = "ETCETH",
  ETC_XBT = "ETCXBT",
  ETC_EUR = "ETCEUR",
  ETC_USD = "ETCUSD",
  ETH_XBT = "ETHXBT",
  // ETH_XBT_d = "ETHXBT.d",
  ETH_CAD = "ETHCAD",
  // ETH_CAD_d = "ETHCAD.d",
  ETH_EUR = "ETHEUR",
  // ETH_EUR_d = "ETHEUR.d",
  ETH_GBP = "ETHGBP",
  // ETH_GBP_d = "ETHGBP.d",
  ETH_JPY = "ETHJPY",
  // ETH_JPY_d = "ETHJPY.d",
  ETH_USD = "ETHUSD",
  // ETH_USD_d = "ETHUSD.d",
  ICN_ETH = "ICNETH",
  ICN_XBT = "ICNXBT",
  LTC_XBT = "LTCXBT",
  LTC_EUR = "LTCEUR",
  LTC_USD = "LTCUSD",
  MLN_ETH = "MLNETH",
  MLN_XBT = "MLNXBT",
  REP_ETH = "REPETH",
  REP_XBT = "REPXBT",
  REP_EUR = "REPEUR",
  REP_USD = "REPUSD",
  XBT_CAD = "XBTCAD",
  // XBT_CAD_d = "XBTCAD.d",
  XBT_EUR = "XBTEUR",
  // XBT_EUR_d = "XBTEUR.d",
  XBT_GBP = "XBTGBP",
  // XBT_GBP_d = "XBTGBP.d",
  XBT_JPY = "XBTJPY",
  // XBT_JPY_d = "XBTJPY.d",
  XBT_USD = "XBTUSD",
  // XBT_USD_d = "XBTUSD.d",
  XDG_XBT = "XDGXBT",
  XLM_XBT = "XLMXBT",
  XLM_EUR = "XLMEUR",
  XLM_USD = "XLMUSD",
  XMR_XBT = "XMRXBT",
  XMR_EUR = "XMREUR",
  XMR_USD = "XMRUSD",
  XRP_XBT = "XRPXBT",
  XRP_CAD = "XRPCAD",
  XRP_EUR = "XRPEUR",
  XRP_JPY = "XRPJPY",
  XRP_USD = "XRPUSD",
  ZEC_XBT = "ZECXBT",
  ZEC_EUR = "ZECEUR",
  ZEC_JPY = "ZECJPY",
  ZEC_USD = "ZECUSD"
};

export type Order = {
  id: string;
  refid: string | null,
  userref: number,
  status: Status,
  opentm: number,
  starttm: number,
  expiretm: number,
  pair: Pair,
  type: OrderType,
  ordertype: string,
  price: number,
  price2: number,
  leverage: string,
  order: string,
  close: string
  base: Symbol,
  quote: Symbol,
  vol: number,
  vol_exec: number,
  cost: number,
  fee: number,
  actualPrice: number,
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
  base: Symbol,
  quote: Symbol,
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