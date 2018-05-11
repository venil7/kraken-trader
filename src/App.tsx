import React from "react";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { Drawer } from './Drawer';
import { reducer, GlobalState } from './redux/reducers';

import { Home, Orders, Settings } from './screens';
import { serialize } from "./redux/middleware/serialize";
import { initialize } from "./initialize";

const AppNavigator = StackNavigator(
  {
    Home: { screen: Home },
    Drawer: { screen: Drawer },
    Orders: { screen: Orders },
    Settings: { screen: Settings }
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