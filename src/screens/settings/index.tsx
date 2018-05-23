import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "../../redux/actions";
import { saveSettingThunk } from "../../redux/actions/settings";
import { PartialSettings, SettingsState } from "../../redux/reducers/settings";
import { StaticState } from "../../redux/reducers/static";
import { settingsSelector, staticSelector } from "../../redux/selectors";
import { Screen, ScreenProps } from '../common';
import { SettingsApiForm } from "./api-form";
import { SettingsFooter, SettingsTab } from "./footer";
import { SettingsTradingForm } from "./trading-form";
import { SettingsViewForm } from "./view-form";

const stateToProps = createSelector(
  [settingsSelector, staticSelector],
  (settings, statics) => ({ settings, statics })
);

const dispatchToProps = (dispatch: Dispatch) => ({
  saveSettings: (settings: PartialSettings) =>
    dispatch(saveSettingThunk(settings))
});

type SettingsProps = ScreenProps & {
  statics: StaticState;
  settings: SettingsState;
  saveSettings: (settings: PartialSettings) => void;
};

type State = {
  tab: SettingsTab
};

@connect(stateToProps, dispatchToProps)
export class Settings extends Component<SettingsProps, State> {
  state = { tab: SettingsTab.Trading };

  onSave = (settings: Partial<SettingsState>) =>
    this.props.saveSettings(settings);

  render() {
    const { tab } = this.state;
    const props = this.props;
    return (
      <Screen
        back
        title="Settings"
        {...props}
        render={(_props) => {
          switch (tab) {
            case SettingsTab.Trading:
              return (<SettingsTradingForm
                {...props}
                onChange={this.onSave}
              />)
            case SettingsTab.View:
              return (<SettingsViewForm
                {...props}
                onChange={this.onSave}
              />)
            case SettingsTab.API:
            default:
              return (
                <SettingsApiForm
                  {...props}
                  onChange={this.onSave}
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
