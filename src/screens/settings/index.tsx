import React from "react";
import { Component } from "react";
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
import { StaticState } from "../../redux/reducers/static";

const stateToProps = ({ settings, statics }: GlobalState) => ({ settings, statics });
const dispatchToProps = (dispatch: Dispatch) => {
  return {
    saveSettings: (settings: SettingsState) => dispatch(saveSettingsThunk(settings))
  };
};

type SettingsProps = ScreenProps & {
  statics: StaticState;
  settings: SettingsState;
  saveSettings: (settings: SettingsState) => void;
};

type State = {
  tab?: SettingsTab
  settings: SettingsState,
};

@connect(stateToProps, dispatchToProps)
export class Settings extends Component<SettingsProps, State> {

  state = {
    settings: defaultSettings,
    tab: SettingsTab.Trading,
  };

  static getDerivedStateFromProps(nextProps: SettingsProps): State {
    return { settings: nextProps.settings };
  }

  onAuthChange = (auth: { key?: string, secret?: string }, save = false) => {
    const { settings } = this.state;
    this.setState({ settings: { ...settings, ...auth } }, () => {
      if (save) {
        this.onSave();
      }
    });
  }

  onSave = () => this.props.saveSettings(this.state.settings);

  render() {
    const { tab, settings } = this.state;
    const props = { ...this.props, settings };
    return (
      <Screen
        back
        title="Settings"
        {...props}
        render={(_props) => {
          switch (tab) {
            case SettingsTab.Trading:
              return (<SettingsTradingForm {...props} />)
            case SettingsTab.View:
              return (<SettingsViewForm {...props} />)
            case SettingsTab.API:
            default:
              return (
                <SettingsApiForm
                  {...props}
                  onSave={this.onSave}
                  onAuthChange={this.onAuthChange}
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
