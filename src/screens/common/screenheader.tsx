import React from 'react'
// import { Component } from 'react';
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base';

type HeaderProps = {
  navigate: (s: string) => void;
  title: string;
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

export { ScreenHeader };