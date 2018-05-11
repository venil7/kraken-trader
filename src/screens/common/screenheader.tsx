import React from 'react'
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';

export type ScreenHeaderProps = {
  navigation: NavigationScreenProp<any>;
  onRefresh: () => void;
  title: string;
  back?: boolean;
  loading?: boolean;
};

const openDrawer = (navigation: NavigationScreenProp<any>) => () =>
  navigation.navigate('DrawerOpen');

const ScreenHeader = ({
  navigation,
  onRefresh,
  title,
  loading = false,
  back = false
}: ScreenHeaderProps) => {
  const icon = back ? 'md-arrow-back' : 'menu';
  const showRefresh = !loading && !!onRefresh;
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
        {showRefresh ? (
          <Button transparent>
            <Icon name="refresh" onPress={onRefresh} />
          </Button>
        ) : null}
      </Right>
    </Header>
  );
};

export { ScreenHeader };