import { Body, List, ListItem, Right, Switch, Text } from "native-base";
import React from "react";
import { PartialSettings, SettingsState } from "../../redux/reducers/settings";
import { ScreenProps } from "../common";

export type SettingsViewFormProps = ScreenProps & {
  settings: SettingsState;
  onChange: (settings: PartialSettings) => void;
};

export const SettingsViewForm = ({ settings, onChange }: SettingsViewFormProps) => {
  const {
    excludeCancelledOrders,
    excludeZeroBalance
  } = settings;
  return (
    <List>
      <ListItem icon>
        <Body>
          <Text>Exclude tiny balances</Text>
        </Body>
        <Right>
          <Switch value={excludeZeroBalance}
            onValueChange={excludeZeroBalance => onChange({ excludeZeroBalance })} />
        </Right>
      </ListItem>
      <ListItem icon>
        <Body>
          <Text>Exclude cancelled orders</Text>
        </Body>
        <Right>
          <Switch value={excludeCancelledOrders}
            onValueChange={excludeCancelledOrders => onChange({ excludeCancelledOrders })} />
        </Right>
      </ListItem>
    </List>
  )
};