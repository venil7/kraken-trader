import React from "react";
import { Component } from "react";
import { Text, Form, Item, Input, Label, Icon, Button, Footer, FooterTab } from "native-base";
import { Screen, ScreenProps } from '../common';
import { GlobalState } from "../../redux/reducers";
import { saveSettingsThunk, SettingsAction } from "../../redux/actions/settings";
import { SettingsState, defaultSettings } from "../../redux/reducers/settings";
import { connect } from "react-redux";
import { Dispatch } from "../../redux/actions";
import { SettingsApiForm } from "./api-form";
import { SettingsFooter, SettingsTab } from "./footer";
import { SettingsTradingForm } from "./trading-form";
import { SettingsViewForm } from "./view-form";

const stateToProps = (state: GlobalState) => ({ settings: state.settings });
const dispatchToProps = (dispatch: Dispatch) => {
  return {
    saveSettings: (settings: SettingsState) => dispatch(saveSettingsThunk(settings))
  };
};

type SettingsProps = ScreenProps & {
  settings: SettingsState,
  saveSettings: (settings: SettingsState) => void,
};

type State = {
  tab?: SettingsTab
  settings: SettingsState,
};

@connect(stateToProps, dispatchToProps)
export class Settings extends Component<SettingsProps, State> {

  state = {
    settings: defaultSettings,
    tab: SettingsTab.API,
  };

  static getDerivedStateFromProps(nextProps: SettingsProps): State {
    return { settings: nextProps.settings };
  }

  onChange = (key: string, value: any) => {
    const newSettings = { [key]: value } as SettingsState;
    const { settings } = this.state;
    this.setState({ settings: { ...settings, ...newSettings } });
  }

  onSave = () => this.props.saveSettings(this.state.settings);

  render() {
    const { tab } = this.state;
    return (
      <Screen
        back
        title="Settings"
        {...this.props}
        render={(props) => {
          switch (tab) {
            case SettingsTab.Trading:
              return (<SettingsTradingForm {...this.props} />)
            case SettingsTab.View:
              return (<SettingsViewForm {...this.props} />)
            case SettingsTab.API:
            default:
              return (
                <SettingsApiForm
                  {...this.props}
                  onSave={this.onSave}
                  onChange={this.onChange}
                />
              );
          }
        }}
        footer={(props) => <SettingsFooter
          {...props} active={tab}
          onTab={(tab) => this.setState({ tab })}
        />}
      />
    );
  }
}
