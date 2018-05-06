import React from "react";
import { Component } from "react";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
} from "native-base";
import styles from "./style";

const items = [
  {
    name: "Home",
    route: "Home",
    icon: { name: "home", type: "FontAwesome" },
    bg: "#C5F442"
  },
  {
    name: "Orders",
    route: "Orders",
    icon: { name: "list", type: "Entypo" },
    bg: "#C5F442"
  },
  {
    name: "New Order",
    route: "NewOrder",
    icon: { name: "add-to-list", type: "Entypo" },
    bg: "#477EEA",
  },
  {
    name: "Settings",
    route: "Settings",
    icon: { name: "settings", type: "Feather" },
    bg: "#DA4437",
  },
  {
    name: "About",
    route: "About",
    icon: { name: "price-tag", type: "Entypo" },
    bg: "#DA4437",
  }
];

export class SideBar extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <List
            dataArray={items}
            renderRow={data => (
              <ListItem button noBorder onPress={() => navigate(data.route)}>
                <Left>
                  <Icon
                    {...data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>{data.name}</Text>
                </Left>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}
