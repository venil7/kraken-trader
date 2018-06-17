import { Button, Content, List, ListItem, Text } from "native-base";
import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "../../redux/actions";
import { loadedBalances } from "../../redux/actions/balance";
import { loadedClosedOrders, loadedOpenOrders } from "../../redux/actions/order";
import { loadedStatic } from "../../redux/actions/static";
import { loadedTickers } from "../../redux/actions/ticker";
import { GlobalState } from "../../redux/reducers";
import { ErrorRec } from "../../redux/reducers/error";
import { Screen, ScreenProps } from '../common';

const stateToProps = (state: GlobalState) => {
  return { errors: state.errors.errors };
};

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    clear: () => {
      dispatch(loadedBalances([]));
      dispatch(loadedTickers([]));
      dispatch(loadedStatic({ assets: [], tradables: [] }));
      dispatch(loadedClosedOrders([]));
      dispatch(loadedOpenOrders([]));
    }
  };
};

type DebugProps = ScreenProps & {
  errors: ErrorRec[];
  clear: () => void;
};

@connect(stateToProps, dispatchToProps)
export class Debug extends Component<DebugProps> {
  render() {
    const { clear, errors } = this.props;
    return (
      <Screen title="Debug" {...this.props} render={(props) => (
        <Content>
          <Button onPress={clear}>
            <Text>Clear Store</Text>
          </Button>
          <List>
            {errors.map(({ message, name, stack }) => (
              <ListItem>
                <Text>{name}</Text>
                <Text>{message}</Text>
                <Text>{stack}</Text>
              </ListItem>
            ))}
          </List>
        </Content>
      )} />
    );
  }
}
