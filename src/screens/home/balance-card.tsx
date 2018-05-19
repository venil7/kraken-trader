import { Body, Card, CardItem, Left, List, ListItem, Right, Text } from "native-base";
import * as React from 'react';
import { Balance, Symbol, Ticker } from "../../domain";
import { symbolToName, toAmount } from "../../services/convert";
import { hideIfNoData } from "../common/hide";
import { CryptoIcon } from "./crypto-icon";

export type BalanceCardProps = {
  balances: Balance[];
  tickers: Ticker[];
};

const tickerForSymbol = (tickers: Ticker[]) => (base: Symbol) =>
  tickers.find(t => t.base === base);

type TickerProps = { ticker?: Ticker };
const TickerText = ({ ticker }: TickerProps) => ticker
  ? <Text note>{toAmount(ticker.last, ticker.quote)}</Text>
  : null;


const BalanceCard_ = ({ balances, tickers }: BalanceCardProps) => {
  const ticker = tickerForSymbol(tickers);
  return (
    <Card>
      <CardItem header>
        <Text>Balances:</Text>
      </CardItem>
      <List>
        {balances.map((balance: Balance) => (
          <ListItem icon key={balance.symbol}>
            <Left>
              <CryptoIcon symbol={balance.symbol} />
            </Left>
            <Body>
              <Text>{symbolToName(balance.symbol)}</Text>
              <TickerText ticker={ticker(balance.symbol)} />
            </Body>
            <Right>
              <Text>{toAmount(balance.balance, balance.symbol)}</Text>
            </Right>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const BalanceCard = hideIfNoData(
  (props: BalanceCardProps) => !props.balances.length
)(BalanceCard_);
