import React from 'react'
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';


export type ScreenHeaderProps = {
  navigation: NavigationScreenProp<any>;
  refresh: () => void;
  title: string;
  back?: boolean;
};

const openDrawer = (navigation: NavigationScreenProp<any>) => () =>
  navigation.navigate('DrawerOpen');

const ScreenHeader = ({
  navigation,
  refresh,
  title,
  back = false
}: ScreenHeaderProps) => {
  const icon = back ? 'md-arrow-back' : 'menu';
  return (
    <Header>
      <Left>
        <Button transparent onPress={openDrawer(navigation)}>
          <Icon name={icon} type="Ionicons" />
        </Button>
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name="refresh" onPress={refresh} />
        </Button>
      </Right>
    </Header>
  );
};

export { ScreenHeader };