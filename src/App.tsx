import { Root } from "native-base";
import React from "react";
import { StackNavigator } from "react-navigation";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Drawer } from './Drawer';
import { initialize } from "./initialize";
import { serialize } from "./redux/middleware/serialize";
import { reducer } from './redux/reducers';
import { Debug, Home, Orders, Settings } from './screens';

const AppNavigator = StackNavigator(
  {
    Home: { screen: Home },
    Drawer: { screen: Drawer },
    Orders: { screen: Orders },
    Settings: { screen: Settings },
    Debug: { screen: Debug },
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger, serialize)
);

initialize(store);

export default () => (
  <Root>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  </Root>
);