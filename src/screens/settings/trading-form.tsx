import React from "react";
import { ScreenProps } from "../common";
import { Text, Icon, ListItem, Right, Body, Left, List } from "native-base";
import { SettingsState } from "../../redux/reducers/settings";
import { SymbolPicker } from "./symbol-picker";
import { StaticState } from "../../redux/reducers/static";

export type SettingsTradingFormProps = ScreenProps & {
  settings: SettingsState;
  statics: StaticState;
  // onSave: () => void;
};

export const SettingsTradingForm = (props: SettingsTradingFormProps) => (
  <List>
    <ListItem avatar>
      <Left>
        {/* <Icon name="dollar" /> */}
      </Left>
      <Body>
        <Text>Base Fiat Currency</Text>
        <Text note>select preferred base fiat currency</Text>
        <SymbolPicker
          symbols={props.statics.fiats.map(f => f.symbol)}
          selected={props.settings.baseFiatSymbol}
          onSelect={() => null} />
      </Body>
      {/* <Right> */}
      {/* </Right> */}
    </ListItem>
  </List>
);