import React from "react";
import { ScreenProps } from "../common";
import { Form, Button, Text, Item, Input, Label, Icon } from "native-base";
import { SettingsState } from "../../redux/reducers/settings";

export type SettingsTradingFormProps = ScreenProps & {
  settings: SettingsState;
  // onSave: () => void;
  // onChange: (field: string, value: string) => void;
};

export const SettingsTradingForm = (props: SettingsTradingFormProps) => (
  <Form>
    <Text>Trading settings here</Text>
  </Form>
);