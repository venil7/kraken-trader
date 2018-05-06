import React from "react";
import { Component } from "react";
import { Text, Form, Item, Input, Label, Icon, Button } from "native-base";
import { Screen, ScreenProps } from '../common';
import { GlobalState } from "../../redux/reducers";
import { saveSettingsThunk } from "../../redux/actions/settings";
import { SettingsState } from "../../redux/reducers/settings";
import { connect } from "react-redux";
import { defaultSettings } from "../../services/settings";

const stateToProps = (state: GlobalState) => ({ settings: state.settings });
const dispatchToProps = (dispatch: Function) => {
  return {
    saveSettings: (settings: SettingsState) => dispatch(saveSettingsThunk(settings))
  };
};

type SettingsProps = ScreenProps & {
  settings: SettingsState,
  saveSettings: (settings: SettingsState) => void,
};

type State = {
  settings: SettingsState,
}

@connect(stateToProps, dispatchToProps)
export class Settings extends Component<SettingsProps, State> {

  state = { settings: defaultSettings };

  static getDerivedStateFromProps(nextProps: SettingsProps): State {
    return { settings: nextProps.settings };
  }

  onFieldChange = (key: string) => (value: any) => {
    const newSettings = { [key]: value } as SettingsState;
    const { settings } = this.state;
    this.setState({ settings: { ...settings, ...newSettings } });
  }

  onSave = () => this.props.saveSettings(this.state.settings);

  render() {
    const { settings } = this.state;
    return (
      <Screen title="Settings" {...this.props} render={(props) => (
        <Form>
          <Item>
            <Icon active type="MaterialCommunityIcons" name="account-key" />
            <Label>Kraken API</Label>
          </Item>
          <Item floatingLabel>
            <Label>Kraken API Key</Label>
            <Input value={settings.key} onChangeText={this.onFieldChange('key')} />
          </Item>
          <Item floatingLabel>
            <Label>Kraken API Secret</Label>
            <Input value={settings.secret} onChangeText={this.onFieldChange('secret')} />
          </Item>
          <Button block success onPress={this.onSave}>
            <Text>Save settings</Text>
          </Button>
        </Form>
      )} />
    );
  }
}
