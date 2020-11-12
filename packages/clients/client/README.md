# WalletConnect Client

Client for WalletConnect

For more details, read the [documentation](https://docs.walletconnect.org)

## Install

```bash
yarn add @unifiedwalletconnect/client
# OR

npm install --save @unifiedwalletconnect/client
```

## Initiate Connection

```javascript
import WalletConnect from "@unifiedwalletconnect/client";

// Create a connector
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
});

connector.on("session_update", (error, payload) => {
  if (error) {
    throw error;
  }

  // Get updated accounts and chainId
  const { accounts, chainId } = payload.params[0];
});

connector.on("disconnect", (error, payload) => {
  if (error) {
    throw error;
  }

  // Delete connector
});

const { accounts, chainId } = await connector.connect();
```

## Send Custom Request

```javascript
// Draft Custom Request
const customRequest = {
  id: 1337,
  jsonrpc: "2.0",
  method: "eth_signTransaction",
  params: [
    {
      from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3",
      to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359",
      data: "0x",
      gasPrice: "0x02540be400",
      gasLimit: "0x9c40",
      value: "0x00",
      nonce: "0x0114",
    },
  ],
};

// Send Custom Request
connector
  .sendCustomRequest(customRequest)
  .then(result => {
    // Returns request result
    console.log(result);
  })
  .catch(error => {
    // Error returned when rejected
    console.error(error);
  });
```

## Create Instant Request

```js
import WalletConnect from "@unifiedwalletconnect/browser";
import WalletConnectQRCodeModal from "@unifiedwalletconnect/qrcode-modal";

// Create a connector
const connector = new WalletConnect();

// Draft Instant Request
const instantRequest = {
  id: 1,
  jsonrpc: "2.0",
  method: "eth_signTransaction",
  params: [
    {
      from: "0xbc28ea04101f03ea7a94c1379bc3ab32e65e62d3",
      to: "0x0000000000000000000000000000000000000000",
      nonce: 1,
      gas: 100000,
      value: 0,
      data: "0x0",
    },
  ],
};

// Create Instant Request
connector
  .createInstantRequest(instantRequest)
  .then(result => {
    // Get Instant Request Result
    console.log(result);
  })
  .catch(error => {
    // Handle Error or Rejection
    console.error(error);
  });
```
