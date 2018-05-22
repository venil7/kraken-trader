import { Body, Card, CardItem, Left, List, ListItem, Right, Text } from "native-base";
import * as React from 'react';
import { BalanceWithTicker, Symbol, Ticker } from "../../domain";
import { symbolToName, toAmount } from "../../services/convert";
import { hideIfNoData } from "../common/hide";
import { CryptoIcon } from "./crypto-icon";

export type BalanceCardProps = {
  balances: BalanceWithTicker[];
  total: number;
  totalSymbol: Symbol;
};

type LastProps = { ticker?: Ticker };
const Last = ({ ticker }: LastProps) => ticker
  ? <Text note>{toAmount(ticker.last, ticker.quote)}</Text>
  : null;

const BalanceCard_ = ({ balances, total, totalSymbol }: BalanceCardProps) => {
  return (
    <Card>
      <CardItem header>
        <Text>Total: {toAmount(total, totalSymbol)}</Text>
      </CardItem>
      <List>
        {balances.map((balance: BalanceWithTicker) => (
          <ListItem icon key={balance.symbol}>
            <Left>
              <CryptoIcon symbol={balance.symbol} />
            </Left>
            <Body>
              <Text>{symbolToName(balance.symbol)}</Text>
              <Last ticker={balance.ticker} />
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
