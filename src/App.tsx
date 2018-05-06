import React from "react";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { Drawer } from './Drawer';
import { reducer } from './redux/reducers';

import { Home, Orders, Settings } from './screens';
import { loadSettingsThunk } from "./redux/actions/settings";

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
  applyMiddleware(thunk, logger)
);

// initialization
store.dispatch(loadSettingsThunk());

export default () =>
  (<Root>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  </Root>);