import React from "react";
import { Picker } from "native-base";
import { Symbol, Asset } from "../../domain";
import { symbolToName } from "../../services/convert";

export type SymbolPickerProps = {
  selected: Symbol;
  symbols: Symbol[];
  onSelect: (s: Symbol) => void;
};

export const SymbolPicker = (props: SymbolPickerProps) => (console.log(props), (
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
));