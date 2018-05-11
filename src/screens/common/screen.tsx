import React from 'react'
import { Component } from 'react';
import { Container, Content, Spinner, Text } from 'native-base';
import { ScreenHeader, ScreenHeaderProps } from './screenheader';
import { spinnerWhileLoading } from './loading';

export type ScreenProps = ScreenHeaderProps & {
  render: (p: ScreenProps) => JSX.Element;
};

const ScreenContent = spinnerWhileLoading((props: ScreenProps) => (
  <Content>
    {props.render(props)}
  </Content>
));

export class Screen extends Component<ScreenProps> {
  render() {
    const { props } = this;
    return (
      <Container>
        <ScreenHeader {...props} />
        <ScreenContent {...props} />
      </Container >
    );
  }
};
