import React from "react";
import { ScreenProps } from "../common";
import { Form, Button, Text, Item, Input, Label, Icon, Content } from "native-base";
import { SettingsState } from "../../redux/reducers/settings";
import { QrReader } from "./qr-reader";

export type SettingsApiFormProps = ScreenProps & {
  settings: SettingsState;
  onSave: () => void;
  onAuthChange: (auth: { key?: string; secret?: string; }, save?: boolean) => void;
};

export const SettingsApiForm = (props: SettingsApiFormProps) => (
  <Form>
    <Content padder />
    <Item>
      <Icon active type="MaterialCommunityIcons" name="account-key" />
      <Label>Kraken API</Label>
    </Item>
    <Item floatingLabel>
      <Label>Kraken API Key</Label>
      <Input value={props.settings.key}
        onChangeText={key => props.onAuthChange({ key })} />
    </Item>
    <Item floatingLabel>
      <Label>Kraken API Secret</Label>
      <Input value={props.settings.secret}
        onChangeText={secret => props.onAuthChange({ secret })} />
    </Item>
    <Content padder />
    <QrReader onRead={(auth) => props.onAuthChange(auth, true)} />
    <Content padder />
    <Button primary full onPress={props.onSave}>
      <Icon name="save" type="Feather" />
      <Text>Save</Text>
    </Button>
  </Form>
);