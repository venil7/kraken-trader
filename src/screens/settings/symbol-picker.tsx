import { Picker } from "native-base";
import React from "react";
import { Symbol } from "../../domain";
import { symbolToName } from "../../services/convert";

export type SymbolPickerProps = {
  selected: Symbol;
  symbols: Symbol[];
  onSelect: (s: Symbol) => void;
};

export const SymbolPicker = (props: SymbolPickerProps) => (
  <Picker
    mode="dropdown"
    selectedValue={props.selected}
    onValueChange={props.onSelect}
  >
    {props.symbols.map(symbol => (
      <Picker.Item
        key={symbol}
        label={symbolToName(symbol)}
        value={symbol} />
    ))}
  </Picker>
);