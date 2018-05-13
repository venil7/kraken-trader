import React from "react";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Text, Button, Icon } from "native-base";
import { Authable } from "../../services/kraken";

const extractAuth = (data: string): Authable => {
  const KRAKEN_REGEX = /kraken:\/\/apikey\?key=(.+)&secret=(.+)/;
  const [, key = '', secret = ''] = KRAKEN_REGEX.exec(data) || [];
  return { key, secret };
};

export type QrReaderProps = {
  onRead: (authable: Authable) => void;
};

export type QrResponse = {
  bounds: { y: string; x: string; }[];
  type: string;
  data: string;
  target: number;
};

export type QrReaderState = {
  showCamera: boolean
};

export class QrReader extends React.Component<QrReaderProps, QrReaderState>{
  state = { showCamera: false };

  onRead = ({ data }: QrResponse) => {
    this.setState({ showCamera: false });
    this.props.onRead(extractAuth(data));
  }

  render() {
    const { showCamera } = this.state;
    return (
      <React.Fragment>
        {!showCamera ? <Button dark full onPress={() => this.setState({ showCamera: true })}>
          <Icon name="qrcode" type="FontAwesome" />
          <Text>Scan</Text>
        </Button> : null}

        {showCamera ? <QRCodeScanner
          onRead={this.onRead}
          bottomContent={<Button danger full onPress={() => this.setState({ showCamera: false })}>
            <Icon name="cancel" type="MaterialIcons" />
            <Text>Cancel</Text>
          </Button>}
        /> : null}
      </React.Fragment>
    );
  }
}