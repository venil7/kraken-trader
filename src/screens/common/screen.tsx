import React from 'react'
import { Component } from 'react';
import { Container, Content } from 'native-base';
import { ScreenHeader, ScreenHeaderProps } from './screenheader';

export type ScreenProps = ScreenHeaderProps & {
  render: (p: ScreenProps) => JSX.Element;
};

export class Screen extends Component<ScreenProps> {
  render() {
    const { render, ...otherProps } = this.props;
    return (
      <Container>
        <ScreenHeader
          {...otherProps}
        />
        <Content>
          {render(this.props)}
        </Content>
      </Container>
    );
  }
};
