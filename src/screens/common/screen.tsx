import React from 'react'
import { Component } from 'react';
import { Container, Content, Spinner, Text, Footer } from 'native-base';
import { ScreenHeader, ScreenHeaderProps } from './screenheader';
import { spinnerWhileLoading } from './loading';
import { branch, renderNothing } from 'recompose';
import { hideIfNoData } from './hide';

export type ScreenProps = ScreenHeaderProps & {
  render: (p: ScreenProps) => JSX.Element;
  footer?: (p: ScreenProps) => JSX.Element;
};

const ScreenContent = spinnerWhileLoading((props: ScreenProps) => (
  <Content>
    {props.render(props)}
  </Content>
));

const hideFooter = hideIfNoData((props: ScreenProps) => !props.footer);
const ScreenFooter = hideFooter((props: ScreenProps) => {
  const footer = props.footer
    ? props.footer
    : () => <React.Fragment />;
  return (
    <Footer>
      {footer(props)}
    </Footer>
  );
});

export class Screen extends Component<ScreenProps> {
  render() {
    const { props } = this;
    return (
      <Container>
        <ScreenHeader {...props} />
        <ScreenContent {...props} />
        <ScreenFooter {...props} />
      </Container >
    );
  }
};
