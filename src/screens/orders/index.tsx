import React from "react";
import { Component } from "react";
import { Text } from "native-base";
import { Screen, ScreenProps } from '../common';

export class Orders extends Component<ScreenProps> {
  render() {
    return (
      <Screen title="Orders" {...this.props} render={(props) => (
        <Text>
          some orders text
        </Text>
      )} />
    );
  }
}
