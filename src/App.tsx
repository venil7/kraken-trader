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
import { loadSettingsThunk } from "./redux/actions/settings";
import { loadBalancesThunk } from "./redux/actions/balance";
import { auth } from "./services/kraken";
import { loadOpenOrdersThunk, loadClosedOrdersThunk } from "./redux/actions/order";

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
(async () => {
  const { dispatch, getState } = store;
  await dispatch(loadSettingsThunk());
  const { settings } = getState() as GlobalState;
  const _auth = auth(settings);
  await dispatch(loadBalancesThunk(_auth));
  await dispatch(loadOpenOrdersThunk(_auth));
  await dispatch(loadClosedOrdersThunk(_auth));
})();


export default () =>
  (<Root>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  </Root>);