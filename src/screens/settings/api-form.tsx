import { Button, Content, Form, Icon, Input, Item, Label, Text } from "native-base";
import * as React from "react";
import { Component } from "react";
import { PartialSettings, SettingsState } from "../../redux/reducers/settings";
import { Authable } from "../../services/kraken";
import { ScreenProps } from "../common";
import { QrReader } from "./qr-reader";

export type SettingsApiFormProps = ScreenProps & {
  settings: SettingsState;
  onChange: (s: PartialSettings) => void;
};

type SettingsApiFormState = {
  key: string;
  secret: string;
}

export class SettingsApiForm extends Component<SettingsApiFormProps, SettingsApiFormState> {
  constructor(props: SettingsApiFormProps) {
    super(props);
    this.state = {
      key: props.settings.key,
      secret: props.settings.secret,
    }
  }

  onSave = () => this.props.onChange(this.state);

  onQrCodeReader = (auth: Authable) => {
    this.setState(auth, () => this.onSave());
  };

  render() {
    const { settings } = this.props;
    return (
      <Form>
        <Content padder />
        <Item>
          <Icon active type="MaterialCommunityIcons" name="account-key" />
          <Label>Kraken API</Label>
        </Item>
        <Item floatingLabel>
          <Label>Kraken API Key</Label>
          <Input value={settings.key}
            onChangeText={key => this.setState({ key })} />
        </Item>
        <Item floatingLabel>
          <Label>Kraken API Secret</Label>
          <Input value={settings.secret}
            onChangeText={secret => this.setState({ secret })} />
        </Item>
        <Content padder />
        <QrReader onRead={this.onQrCodeReader} />
        <Content padder />
        <Button primary full onPress={this.onSave}>
          <Icon name="save" type="Feather" />
          <Text>Save</Text>
        </Button>
      </Form >
    );
  }
}
