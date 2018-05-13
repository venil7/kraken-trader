import React from "react";
import { ScreenProps } from "../common";
import { FooterTab, Button, Icon, Text } from "native-base";

export enum SettingsTab {
  API,
  Trading,
  View,
  Other
};

export type SettingsFooterProps = ScreenProps & {
  active: SettingsTab;
  onTab: (tab: SettingsTab) => void;
};

const buttons = [
  { text: "Trading", name: "exchange", type: "FontAwesome", tab: SettingsTab.Trading },
  { text: "View", name: "view-dashboard", type: "MaterialCommunityIcons", tab: SettingsTab.View },
  { text: "Kraken API", name: "server", type: "Feather", tab: SettingsTab.API },
  { text: "Other", name: "telegram", type: "MaterialCommunityIcons", tab: SettingsTab.Other },
];

export const SettingsFooter = ({ active, onTab }: SettingsFooterProps) => (
  <FooterTab>
    {buttons.map(({ text, name, type, tab }) => (
      <Button key={name} active={active === tab} vertical onPress={() => onTab(tab)}>
        <Icon name={name} type={type} />
        <Text>{text}</Text>
      </Button>
    ))}
  </FooterTab>
);