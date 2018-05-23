import { Body, List, ListItem, Text } from "native-base";
import React from "react";
import { createSelector } from "reselect";
import { PartialSettings, SettingsState } from "../../redux/reducers/settings";
import { StaticState } from "../../redux/reducers/static";
import { ScreenProps } from "../common";
import { SymbolPicker } from "./symbol-picker";

export type SettingsTradingFormProps = ScreenProps & {
  settings: SettingsState;
  statics: StaticState;
  onChange: (settings: PartialSettings) => void;
};

const fiatAssetsSelector = ({ fiats }: StaticState) => fiats;
const fiatSymbolSelector = createSelector(
  [fiatAssetsSelector],
  (fiatAssets) => fiatAssets.map(({ symbol }) => symbol)
);

export const SettingsTradingForm = (props: SettingsTradingFormProps) => {
  const { onChange, settings, statics } = props;
  const fiatSymbols = fiatSymbolSelector(statics);
  return (
    <List>
      <ListItem>
        <Body>
          <Text>Base Fiat Currency</Text>
          <Text note>select preferred base fiat currency</Text>
          <SymbolPicker
            symbols={fiatSymbols}
            selected={settings.prefFiat}
            onSelect={(prefFiat) => onChange({ prefFiat })} />
        </Body>
      </ListItem>
    </List>
  )
};