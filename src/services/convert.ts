/// <reference path="kraken-wrapper.d.ts" />
import { ApiAsset, ApiOHLCRow, ApiOrder, ApiTicker, ApiTradableAssetPair } from 'kraken-wrapper';
import { Asset, CurrencyType, OhlcRow, Order, OrderType, Pair, Status, Symbol, Ticker, TradableAssetPair } from "../domain";

export const currencyType = (symbol: Symbol | string) => symbol.toString().startsWith('Z')
  ? CurrencyType.Fiat
  : CurrencyType.Crypto;

export const toAsset = (symbol: string, asset: ApiAsset): Asset => {
  const type = currencyType(symbol);
  return { ...asset, symbol, type } as Asset;
};

export const toTradableAssetPair = (pair: string, assetPair: ApiTradableAssetPair): TradableAssetPair => {
  return { ...assetPair, pair } as TradableAssetPair;
};

export const toPair = (pairName: string): Pair => {
  switch (pairName) {
    case 'BCHUSD':
    case 'XBCHZUSD': return Pair.BCH_USD;
    case 'BCHXBT':
    case 'XBCHXXBT': return Pair.BCH_XBT;
    case 'DASHEUR':
    case 'XDASHZEUR': return Pair.DASH_EUR;
    case 'DASHUSD':
    case 'XDASHZUSD': return Pair.DASH_USD;
    case 'DASHXBT':
    case 'XDASHXXBT': return Pair.DASH_XBT;
    case 'EOSETH':
    case 'XEOSXETH': return Pair.EOS_ETH;
    case 'EOSEUR':
    case 'XEOSZEUR': return Pair.EOS_EUR;
    case 'EOSUSD':
    case 'XEOSZUSD': return Pair.EOS_USD;
    case 'EOSXBT':
    case 'XEOSXXBT': return Pair.EOS_XBT;
    case 'GNOETH':
    case 'XGNOXETH': return Pair.GNO_ETH;
    case 'GNOEUR':
    case 'XGNOZEUR': return Pair.GNO_EUR;
    case 'GNOUSD':
    case 'XGNOZUSD': return Pair.GNO_USD;
    case 'GNOXBT':
    case 'XGNOXXBT': return Pair.GNO_XBT;
    case 'USDTUSD':
    case 'ZUSDTZUSD': return Pair.USDT_USD;
    case 'ETCETH':
    case 'XETCXETH': return Pair.ETC_ETH;
    case 'ETCXBT':
    case 'XETCXXBT': return Pair.ETC_XBT;
    case 'ETCEUR':
    case 'XETCZEUR': return Pair.ETC_EUR;
    case 'ETCUSD':
    case 'XETCZUSD': return Pair.ETC_USD;
    case 'ETHXBT':
    case 'XETHXXBT': return Pair.ETH_XBT;
    case 'ETHCAD':
    case 'XETHZCAD': return Pair.ETH_CAD;
    case 'ETHEUR':
    case 'XETHZEUR': return Pair.ETH_EUR;
    case 'ETHGBP':
    case 'XETHZGBP': return Pair.ETH_GBP;
    case 'ETHJPY':
    case 'XETHZJPY': return Pair.ETH_JPY;
    case 'ETHUSD':
    case 'XETHZUSD': return Pair.ETH_USD;
    case 'ICNETH':
    case 'XICNXETH': return Pair.ICN_ETH;
    case 'ICNXBT':
    case 'XICNXXBT': return Pair.ICN_XBT;
    case 'LTCXBT':
    case 'XLTCXXBT': return Pair.LTC_XBT;
    case 'LTCEUR':
    case 'XLTCZEUR': return Pair.LTC_EUR;
    case 'LTCUSD':
    case 'XLTCZUSD': return Pair.LTC_USD;
    case 'MLNETH':
    case 'XMLNXETH': return Pair.MLN_ETH;
    case 'MLNXBT':
    case 'XMLNXXBT': return Pair.MLN_XBT;
    case 'REPETH':
    case 'XREPXETH': return Pair.REP_ETH;
    case 'REPXBT':
    case 'XREPXXBT': return Pair.REP_XBT;
    case 'REPEUR':
    case 'XREPZEUR': return Pair.REP_EUR;
    case 'REPUSD':
    case 'XREPZUSD': return Pair.REP_USD;
    case 'XBTCAD':
    case 'XXBTZCAD': return Pair.XBT_CAD;
    case 'XBTEUR':
    case 'XXBTZEUR': return Pair.XBT_EUR;
    case 'XBTGBP':
    case 'XXBTZGBP': return Pair.XBT_GBP;
    case 'XBTJPY':
    case 'XXBTZJPY': return Pair.XBT_JPY;
    case 'XBTUSD':
    case 'XXBTZUSD': return Pair.XBT_USD;
    case 'XDGXBT':
    case 'XXDGXXBT': return Pair.XDG_XBT;
    case 'XLMXBT':
    case 'XXLMXXBT': return Pair.XLM_XBT;
    case 'XLMEUR':
    case 'XXLMZEUR': return Pair.XLM_EUR;
    case 'XLMUSD':
    case 'XXLMZUSD': return Pair.XLM_USD;
    case 'XMRXBT':
    case 'XXMRXXBT': return Pair.XMR_XBT;
    case 'XMREUR':
    case 'XXMRZEUR': return Pair.XMR_EUR;
    case 'XMRUSD':
    case 'XXMRZUSD': return Pair.XMR_USD;
    case 'XRPXBT':
    case 'XXRPXXBT': return Pair.XRP_XBT;
    case 'XRPCAD':
    case 'XXRPZCAD': return Pair.XRP_CAD;
    case 'XRPEUR':
    case 'XXRPZEUR': return Pair.XRP_EUR;
    case 'XRPJPY':
    case 'XXRPZJPY': return Pair.XRP_JPY;
    case 'XRPUSD':
    case 'XXRPZUSD': return Pair.XRP_USD;
    case 'ZECXBT':
    case 'XZECXXBT': return Pair.ZEC_XBT;
    case 'ZECEUR':
    case 'XZECZEUR': return Pair.ZEC_EUR;
    case 'ZECJPY':
    case 'XZECZJPY': return Pair.ZEC_JPY;
    case 'ZECUSD':
    case 'XZECZUSD': return Pair.ZEC_USD;
    default:
      throw new Error('Unknown pair');
  }
};

export const toTicker = (pairName: string, quote: Symbol, tickerInfo: ApiTicker): Ticker => {
  const [ask] = tickerInfo.a;
  const [bid] = tickerInfo.b;
  const [last] = tickerInfo.c;
  const [volume] = tickerInfo.v;
  const [volumeWeightedAverage] = tickerInfo.p;
  const [numberOfTrades] = tickerInfo.t;
  const [low] = tickerInfo.l;
  const [high] = tickerInfo.h;
  const [opening] = tickerInfo.o;
  const pair = toPair(pairName);
  const [base] = pairToSymbols(pair).filter(s => s !== quote);
  return {
    pair,
    base,
    quote,
    ask: parseFloat(ask),
    bid: parseFloat(bid),
    last: parseFloat(last),
    volume: parseFloat(volume),
    volumeWeightedAverage: parseFloat(volumeWeightedAverage),
    numberOfTrades: parseFloat(numberOfTrades),
    low: parseFloat(low),
    high: parseFloat(high),
    opening: parseFloat(opening),
  };
};

export const toOhlcRow = (pairName: string, row: ApiOHLCRow): OhlcRow => {
  const [time, open, high, low, close, vwap, volume, count] = row;
  return {
    pair: toPair(pairName),
    time,
    open: parseFloat(open),
    high: parseFloat(high),
    low: parseFloat(low),
    close: parseFloat(close),
    vwap: parseFloat(vwap),
    volume: parseFloat(volume),
    count,
  };
};

export const symbolToName = (symbol: Symbol): string => {
  switch (symbol) {
    case Symbol.XBT: return 'Bitcoin';
    case Symbol.LTC: return 'Litecoin';
    case Symbol.XDG: return 'Dogecoin';
    case Symbol.REP: return 'Augur';
    case Symbol.XRP: return 'Ripple ';
    case Symbol.XLM: return 'Stellar';
    case Symbol.ETH: return 'Ether';
    case Symbol.ETC: return 'Ether Classic';
    case Symbol.ICN: return 'Iconomi';
    case Symbol.USDT: return 'Tether';
    case Symbol.DASH: return 'Dash';
    case Symbol.ZEC: return 'Zcash';
    case Symbol.XMR: return 'Monero';
    case Symbol.GNO: return 'Gnosis';
    case Symbol.EOS: return 'Eos';
    case Symbol.GBP: return 'British Pound';
    case Symbol.EUR: return 'Euro';
    case Symbol.JPY: return 'Japanese Yen';
    case Symbol.KRW: return 'Korean Won';
    case Symbol.USD: return 'US Dollar';
    case Symbol.CAD: return 'Canadian Dollar';
    default: return symbol.toString();
  }
};

export const symbolToLetter = (symbol: Symbol): string => {
  switch (symbol) {
    case Symbol.XBT: return '฿';
    case Symbol.LTC: return 'Ł';
    case Symbol.XDG: return 'Ð';
    case Symbol.XRP: return '₹';
    case Symbol.ETH: return 'Ξ';
    case Symbol.ETC: return 'ΞC';
    case Symbol.USDT: return '$T';
    case Symbol.XMR: return 'ɱ';
    case Symbol.BCH: return 'ɃC';
    case Symbol.GBP: return '£';
    case Symbol.EUR: return '€';
    case Symbol.JPY: return '¥';
    case Symbol.USD: return '$';
    case Symbol.CAD: return '$C';
    default: return symbolToName(symbol)[0];
  }
};

export const toPairs = (base: Symbol, symbols: Symbol[]): Pair[] =>
  symbols.reduce((acc: Pair[], symbol) => {
    const pair = symbolsToPair(symbol, base);
    return (pair) ? [...acc, pair] : acc;
  }, []);

export const symbolToShortCode = (symbol: Symbol): string => {
  const SYMBOL_REGEX = /(X|Z)([A-Z]{3,})/;
  const [, , code = symbol.toString()] = SYMBOL_REGEX.exec(symbol.toString()) || [];
  return code;
};

export const symbolsToPair = (symbol1: Symbol, symbol2: Symbol): Pair | null => {
  const pairs: string[] = Object.values(Pair);
  const _SymbolToPair = (symbol1: Symbol, symbol2: Symbol): Pair | null => {
    const pairName = `${symbolToShortCode(symbol1)}${symbolToShortCode(symbol2)}`;
    return pairs.includes(pairName) ? <Pair>pairName : null;
  };
  return _SymbolToPair(symbol1, symbol2) || _SymbolToPair(symbol2, symbol1);
};

export const format = (n: number, decimals = 5) => {
  let res = n.toFixed(decimals);
  const last = (s: string) => s[s.length - 1];
  for (let i = 0; i < (decimals - 2); i++) {
    if (last(res) === '0') {
      res = res.substring(0, res.length - 1);
    } else {
      return res;
    }
  }
  return res;
};

export const toAmount = (amount: number, symbol: Symbol): string => {
  const letter = symbolToLetter(symbol);
  const isFiat = currencyType(symbol) === CurrencyType.Fiat;
  const num = format(amount, isFiat ? 2 : 5);
  return `${letter}${num}`;
}

export const orderToText = (order: Order): string =>
  `${toAmount(order.vol, order.base)} @ ${toAmount(order.price, order.quote)}`;

export const pairToSymbols = (pair: Pair): [Symbol, Symbol] => {
  switch (pair) {
    case Pair.BCH_USD: return [Symbol.BCH, Symbol.USD];
    case Pair.BCH_XBT: return [Symbol.BCH, Symbol.XBT];
    case Pair.DASH_EUR: return [Symbol.DASH, Symbol.EUR];
    case Pair.DASH_USD: return [Symbol.DASH, Symbol.USD];
    case Pair.DASH_XBT: return [Symbol.DASH, Symbol.XBT];
    case Pair.EOS_ETH: return [Symbol.EOS, Symbol.ETH];
    case Pair.EOS_EUR: return [Symbol.EOS, Symbol.EUR];
    case Pair.EOS_USD: return [Symbol.EOS, Symbol.USD];
    case Pair.EOS_XBT: return [Symbol.EOS, Symbol.XBT];
    case Pair.GNO_ETH: return [Symbol.GNO, Symbol.ETH];
    case Pair.GNO_EUR: return [Symbol.GNO, Symbol.EUR];
    case Pair.GNO_USD: return [Symbol.GNO, Symbol.USD];
    case Pair.GNO_XBT: return [Symbol.GNO, Symbol.XBT];
    case Pair.USDT_USD: return [Symbol.USDT, Symbol.USD];
    case Pair.ETC_ETH: return [Symbol.ETC, Symbol.ETH];
    case Pair.ETC_XBT: return [Symbol.ETC, Symbol.XBT];
    case Pair.ETC_EUR: return [Symbol.ETC, Symbol.EUR];
    case Pair.ETC_USD: return [Symbol.ETC, Symbol.USD];
    case Pair.ETH_XBT: return [Symbol.ETH, Symbol.XBT];
    // case Pair.ETH_XBT_d: return [Symbol.ETH, Symbol.XBT];
    case Pair.ETH_CAD: return [Symbol.ETH, Symbol.CAD];
    // case Pair.ETH_CAD_d: return [Symbol.ETH, Symbol.CAD];
    case Pair.ETH_EUR: return [Symbol.ETH, Symbol.EUR];
    // case Pair.ETH_EUR_d: return [Symbol.ETH, Symbol.EUR];
    case Pair.ETH_GBP: return [Symbol.ETH, Symbol.GBP];
    // case Pair.ETH_GBP_d: return [Symbol.ETH, Symbol.GBP];
    case Pair.ETH_JPY: return [Symbol.ETH, Symbol.JPY];
    // case Pair.ETH_JPY_d: return [Symbol.ETH, Symbol.JPY];
    case Pair.ETH_USD: return [Symbol.ETH, Symbol.USD];
    // case Pair.ETH_USD_d: return [Symbol.ETH, Symbol.USD];
    case Pair.ICN_ETH: return [Symbol.ICN, Symbol.ETH];
    case Pair.ICN_XBT: return [Symbol.ICN, Symbol.XBT];
    case Pair.LTC_XBT: return [Symbol.LTC, Symbol.XBT];
    case Pair.LTC_EUR: return [Symbol.LTC, Symbol.EUR];
    case Pair.LTC_USD: return [Symbol.LTC, Symbol.USD];
    case Pair.MLN_ETH: return [Symbol.MLN, Symbol.ETH];
    case Pair.MLN_XBT: return [Symbol.MLN, Symbol.XBT];
    case Pair.REP_ETH: return [Symbol.REP, Symbol.ETH];
    case Pair.REP_XBT: return [Symbol.REP, Symbol.XBT];
    case Pair.REP_EUR: return [Symbol.REP, Symbol.EUR];
    case Pair.REP_USD: return [Symbol.REP, Symbol.USD];
    case Pair.XBT_CAD: return [Symbol.XBT, Symbol.CAD];
    // case Pair.XBT_CAD_d: return [Symbol.XBT, Symbol.CAD];
    case Pair.XBT_EUR: return [Symbol.XBT, Symbol.EUR];
    // case Pair.XBT_EUR_d: return [Symbol.XBT, Symbol.EUR];
    case Pair.XBT_GBP: return [Symbol.XBT, Symbol.GBP];
    // case Pair.XBT_GBP_d: return [Symbol.XBT, Symbol.GBP];
    case Pair.XBT_JPY: return [Symbol.XBT, Symbol.JPY];
    // case Pair.XBT_JPY_d: return [Symbol.XBT, Symbol.JPY];
    case Pair.XBT_USD: return [Symbol.XBT, Symbol.USD];
    // case Pair.XBT_USD_d: return [Symbol.XBT, Symbol.USD];
    case Pair.XDG_XBT: return [Symbol.XDG, Symbol.XBT];
    case Pair.XLM_XBT: return [Symbol.XLM, Symbol.XBT];
    case Pair.XLM_EUR: return [Symbol.XLM, Symbol.EUR];
    case Pair.XLM_USD: return [Symbol.XLM, Symbol.USD];
    case Pair.XMR_XBT: return [Symbol.XMR, Symbol.XBT];
    case Pair.XMR_EUR: return [Symbol.XMR, Symbol.EUR];
    case Pair.XMR_USD: return [Symbol.XMR, Symbol.USD];
    case Pair.XRP_XBT: return [Symbol.XRP, Symbol.XBT];
    case Pair.XRP_CAD: return [Symbol.XRP, Symbol.CAD];
    case Pair.XRP_EUR: return [Symbol.XRP, Symbol.EUR];
    case Pair.XRP_JPY: return [Symbol.XRP, Symbol.JPY];
    case Pair.XRP_USD: return [Symbol.XRP, Symbol.USD];
    case Pair.ZEC_XBT: return [Symbol.ZEC, Symbol.XBT];
    case Pair.ZEC_EUR: return [Symbol.ZEC, Symbol.EUR];
    case Pair.ZEC_JPY: return [Symbol.ZEC, Symbol.JPY];
    case Pair.ZEC_USD: return [Symbol.ZEC, Symbol.USD];
    default:
      throw new Error('unknown pair');
  }
};

export const toOrder = (id: string, body: ApiOrder): Order => {
  const { descr } = body;
  const [base, quote] = pairToSymbols(descr.pair as Pair);
  return {
    id,
    refid: body.refid,
    userref: body.userref,
    status: <Status>body.status,
    opentm: body.opentm,
    starttm: body.starttm,
    expiretm: body.expiretm,
    pair: <Pair>descr.pair,
    type: <OrderType>descr.type,
    ordertype: descr.ordertype,
    price: parseFloat(descr.price),
    price2: parseFloat(descr.price2),
    leverage: descr.leverage,
    order: descr.order,
    close: descr.close,
    base: base,
    quote: quote,
    vol: parseFloat(body.vol),
    vol_exec: parseFloat(body.vol_exec),
    cost: parseFloat(body.cost),
    fee: parseFloat(body.fee),
    actualPrice: parseFloat(body.price),
    stopprice: parseFloat(body.stopprice),
    limitprice: parseFloat(body.limitprice),
    misc: body.misc,
    oflags: body.oflags
  };
};