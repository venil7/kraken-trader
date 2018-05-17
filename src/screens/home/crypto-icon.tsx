import React from 'react';
import { Symbol, Pair, OrderType } from '../../domain';
import { Thumbnail } from 'native-base';
import { pairToSymbols } from '../../services/convert';
import style from './style';
import { BuySellIcon } from './buy-sell-icon';
import { StyleProp } from 'react-native';
import { ImageStyle } from 'react-native';

const xbt = require('../../../assets/crypto/btc.png');
const ltc = require('../../../assets/crypto/ltc.png');
const xdg = require('../../../assets/crypto/doge.png');
const rep = require('../../../assets/crypto/rep.png');
const xrp = require('../../../assets/crypto/xrp.png');
const xlm = require('../../../assets/crypto/xlm.png');
const eth = require('../../../assets/crypto/eth.png');
const etc = require('../../../assets/crypto/etc.png');
const icn = require('../../../assets/crypto/icn.png');
const usdt = require('../../../assets/crypto/usdt.png');
const dash = require('../../../assets/crypto/dash.png');
const zec = require('../../../assets/crypto/zec.png');
const xmr = require('../../../assets/crypto/xmr.png');
const gno = require('../../../assets/crypto/gno.png');
const eos = require('../../../assets/crypto/eos.png');
const gbp = require('../../../assets/crypto/gbp.png');
const eur = require('../../../assets/crypto/eur.png');
const jpy = require('../../../assets/crypto/jpy.png');
const usd = require('../../../assets/crypto/usd.png');
const cad = require('../../../assets/crypto/cdn.png');
const other = require('../../../assets/crypto/btcp.png');

const symbolToUri = (symbol: Symbol): any => {
  switch (symbol) {
    case Symbol.XBT: return xbt;
    case Symbol.LTC: return ltc;
    case Symbol.XDG: return xdg;
    case Symbol.REP: return rep;
    case Symbol.XRP: return xrp;
    case Symbol.XLM: return xlm;
    case Symbol.ETH: return eth;
    case Symbol.ETC: return etc;
    case Symbol.ICN: return icn;
    case Symbol.USDT: return usdt;
    case Symbol.DASH: return dash;
    case Symbol.ZEC: return zec;
    case Symbol.XMR: return xmr;
    case Symbol.GNO: return gno;
    case Symbol.EOS: return eos;
    case Symbol.GBP: return gbp;
    case Symbol.EUR: return eur;
    case Symbol.JPY: return jpy;
    case Symbol.USD: return usd;
    case Symbol.CAD: return cad;
    default: return other;
  }
};

type Style = StyleProp<ImageStyle>;

export type CryptoIconProps = {
  symbol: Symbol,
  style?: Style
};
export const CryptoIcon = (props: CryptoIconProps) => {
  const s = { ...style.scaleDown, ...props.style };
  return (
    <Thumbnail small source={symbolToUri(props.symbol)} style={s} />
  )
};


export type CryptoPairIconProps = {
  pair: Pair;
  orderType?: OrderType;
};
export const CryptoPairIcon = ({ pair, orderType }: CryptoPairIconProps) => {
  const [symbol1, symbol2] = pairToSymbols(pair);
  const buySellStyle = { ...style.negMargin, ...style.scaleDown };
  return (
    <React.Fragment>
      <CryptoIcon symbol={symbol1} />
      <CryptoIcon symbol={symbol2} style={style.negMargin} />
      {/* {orderType ? <BuySellIcon orderType={orderType} style={buySellStyle} /> : null} */}
    </React.Fragment>
  );
};
