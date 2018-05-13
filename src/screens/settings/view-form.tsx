import React from "react";
import { ScreenProps } from "../common";
import { Form, Button, Text, Item, Input, Label, Icon } from "native-base";
import { SettingsState } from "../../redux/reducers/settings";

export type SettingsViewFormProps = ScreenProps & {
  settings: SettingsState;
  // onSave: () => void;
  // onChange: (field: string, value: string) => void;
};

export const SettingsViewForm = (props: SettingsViewFormProps) => (
  <Form>
    <Text>View settings here</Text>
  </Form>
);