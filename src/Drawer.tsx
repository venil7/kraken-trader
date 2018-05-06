import React from "react";
import { DrawerNavigator } from "react-navigation";
import { SideBar, Home, Orders } from './screens';

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },
  // Orders: { screen: Orders },
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export { Drawer };