import React from "react";
import { ScreenProps } from "../common";
import { Form, Button, Text, Item, Input, Label, Icon } from "native-base";
import { SettingsState } from "../../redux/reducers/settings";

export type SettingsApiFormProps = ScreenProps & {
  settings: SettingsState;
  onSave: () => void;
  onChange: (field: string, value: string) => void;
};

export const SettingsApiForm = (props: SettingsApiFormProps) => (
  <Form>
    <Item>
      <Icon active type="MaterialCommunityIcons" name="account-key" />
      <Label>Kraken API</Label>
    </Item>
    <Item floatingLabel>
      <Label>Kraken API Key</Label>
      <Input value={props.settings.key} onChangeText={v => props.onChange('key', v)} />
    </Item>
    <Item floatingLabel>
      <Label>Kraken API Secret</Label>
      <Input value={props.settings.secret} onChangeText={v => props.onChange('secret', v)} />
    </Item>
    <Button dark>
      <Icon name="qrcode" type="FontAwesome" />
      <Text>Scan</Text>
    </Button>
    <Button success onPress={props.onSave}>
      <Icon name="save" type="Feather" />
      <Text>Save</Text>
    </Button>
  </Form>
);