import { Body, List, ListItem, Text } from "native-base";
import React from "react";
import { SettingsState } from "../../redux/reducers/settings";
import { StaticState } from "../../redux/reducers/static";
import { ScreenProps } from "../common";
import { SymbolPicker } from "./symbol-picker";

export type SettingsTradingFormProps = ScreenProps & {
  settings: SettingsState;
  statics: StaticState;
};

export const SettingsTradingForm = (props: SettingsTradingFormProps) => (
  <List>
    <ListItem avatar>
      <Body>
        <Text>Base Fiat Currency</Text>
        <Text note>select preferred base fiat currency</Text>
        <SymbolPicker
          symbols={props.statics.fiats.map(f => f.symbol)}
          selected={props.settings.prefFiat}
          onSelect={() => null} />
      </Body>
    </ListItem>
  </List>
);