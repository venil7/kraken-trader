import React from 'react'
import { Component } from 'react';
import { Container, Content, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';

export type ScreenProps = {
  navigation: NavigationScreenProp<any>;
  render: (p: ScreenProps) => JSX.Element;
  title: string;
};

export class Screen extends Component<ScreenProps> {
  render() {
    const { navigation: { navigate }, render, title } = this.props;
    return (
      <Container>
        <ScreenHeader navigate={navigate} title={title} />
        <Content>
          {render(this.props)}
        </Content>
      </Container>
    );
  }
};

const ScreenHeader = ({ navigate, title }: HeaderProps) => (
  <Header>
    <Left>
      <Button transparent onPress={() => navigate('DrawerOpen')}>
        <Icon name='menu' />
      </Button>
    </Left>
    <Body>
      <Title>{title}</Title>
    </Body>
    <Right />
  </Header>
);
