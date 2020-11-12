import Connector from "@unifiedwalletconnect/core";
import { IWalletConnectOptions, IPushServerOptions } from "@unifiedwalletconnect/types";
import * as cryptoLib from "@unifiedwalletconnect/iso-crypto";

class WalletConnect extends Connector {
  constructor(connectorOpts: IWalletConnectOptions, pushServerOpts?: IPushServerOptions) {
    super({
      cryptoLib,
      connectorOpts,
      pushServerOpts,
    });
  }
}

export default WalletConnect;
