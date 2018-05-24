import { Container, Content, Footer } from 'native-base';
import * as React from 'react';
import { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { hideIfNoData } from './hide';
import { ScreenHeader, ScreenHeaderProps } from './screenheader';

export type ScreenProps = ScreenHeaderProps & {
  render: (p: ScreenProps) => JSX.Element;
  footer?: (p: ScreenProps) => JSX.Element;
};

const ScreenContent = (props: ScreenProps) => {
  const { loading = false } = props;
  return (
    <Content>
      <Spinner visible={loading} />
      {props.render(props)}
    </Content>
  )
};

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
