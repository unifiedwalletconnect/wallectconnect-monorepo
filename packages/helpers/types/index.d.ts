declare module "@unifiedwalletconnect/types" {
  export interface IConnector {
    bridge: string;
    key: string;
    clientId: string;
    readonly clientMeta: IClientMeta | null;
    peerId: string;
    peerMeta: IClientMeta | null;
    handshakeTopic: string;
    handshakeId: number;
    uri: string;
    chain: string;
    network: string;
    rpcUrl: string;
    accounts: string[];
    readonly connected: boolean;
    readonly pending: boolean;
    session: IWalletConnectSession;

    on(event: string, callback: (error: Error | null, payload: any | null) => void): void;
    connect(opts: ICreateSessionOptions): Promise<ISessionStatus>;
    createSession(opts: ICreateSessionOptions): Promise<void>;
    approveSession(sessionStatus: ISessionStatus): void;
    rejectSession(sessionError?: ISessionError): void;
    updateSession(sessionStatus: ISessionStatus): void;
    killSession(sessionError?: ISessionError): Promise<void>;
    createInstantRequest(opts: ICreateSessionOptions, request: Partial<IJsonRpcRequest>, options?: IRequestOptions): Promise<any>;

    sendCustomRequest(request: Partial<IJsonRpcRequest>, options?: IRequestOptions): Promise<any>;
    unsafeSend(
      request: IJsonRpcRequest,
      options?: IRequestOptions,
    ): Promise<IJsonRpcResponseSuccess | IJsonRpcResponseError>;

    approveRequest(response: Partial<IJsonRpcResponseSuccess>): void;
    rejectRequest(response: Partial<IJsonRpcResponseError>): void;
  }

  export interface ICryptoLib {
    generateKey: (length?: number) => Promise<ArrayBuffer>;
    encrypt: (
      data: IJsonRpcRequest | IJsonRpcResponseSuccess | IJsonRpcResponseError,
      key: ArrayBuffer,
      iv?: ArrayBuffer,
    ) => Promise<IEncryptionPayload>;
    decrypt: (
      payload: IEncryptionPayload,
      key: ArrayBuffer,
    ) => Promise<IJsonRpcRequest | IJsonRpcResponseSuccess | IJsonRpcResponseError | null>;
  }

  export interface ITransportLib {
    open: () => void;
    close: () => void;
    send: (message: string, topic?: string, silent?: boolean) => void;
    subscribe: (topic: string) => void;
    on: (event: string, callback: (payload: any) => void) => void;
  }

  export interface ITransportEvent {
    event: string;
    callback: (payload: any) => void;
  }

  export type NetworkEvent = "online" | "offline";

  export interface INetworkMonitor {
    on: (event: NetworkEvent, callback: () => void) => void;
  }

  export interface INetworkEventEmitter {
    event: NetworkEvent;
    callback: () => void;
  }

  export interface ISessionStorage {
    getSession: () => IWalletConnectSession | null;
    setSession: (session: IWalletConnectSession) => IWalletConnectSession;
    removeSession: () => void;
  }

  export interface IEncryptionPayload {
    data: string;
    hmac: string;
    iv: string;
  }

  export interface ISocketMessage {
    topic: string;
    type: string;
    payload: string;
    silent: boolean;
  }

  export interface ISocketTransportOptions {
    url: string;
    netMonitor?: INetworkMonitor;
    subscriptions?: string[];
  }

  export interface ISessionStatus {
    chain: string;
    network: string;
    rpcUrl?: string;
    accounts: string[];
  }

  export interface ISessionError {
    message?: string;
  }

  export interface IInternalEvent {
    event: string;
    params: any;
  }

  export interface IJsonRpcResponseSuccess {
    id: number;
    jsonrpc: string;
    result: any;
  }

  export interface IJsonRpcErrorMessage {
    code?: number;
    message: string;
  }

  export interface IJsonRpcResponseError {
    id: number;
    jsonrpc: string;
    error: IJsonRpcErrorMessage;
  }

  export interface IJsonRpcRequest {
    id: number;
    jsonrpc: string;
    method: string;
    params: any[];
  }

  export interface IJsonRpcSubscription {
    id: number;
    jsonrpc: string;
    method: string;
    params: any;
  }

  export type JsonRpc =
    | IJsonRpcRequest
    | IJsonRpcSubscription
    | IJsonRpcResponseSuccess
    | IJsonRpcResponseError;

  export interface IClientMeta {
    description: string;
    url: string;
    icons: string[];
    name: string;
  }

  export interface IEventEmitter {
    event: string;
    callback: (error: Error | null, request: any | null) => void;
  }

  export interface IRequiredParamsResult {
    handshakeTopic: string;
    version: number;
  }

  export interface IQueryParamsResult {
    bridge: string;
    key: string;
  }

  export interface IParseURIResult {
    protocol: string;
    handshakeTopic: string;
    version: number;
    bridge: string;
    key: string;
  }

  export interface ISessionParams {
    approved: boolean;
    chain: string;
    network: string;
    rpcUrl: string;
    accounts: string[];
    peerId: string;
    peerMeta: IClientMeta | null;
  }

  export interface IWalletConnectSession {
    connected: boolean;
    chain: string;
    network: string;
    rpcUrl: string;
    accounts: string[];
    bridge: string;
    key: string;
    clientId: string;
    clientMeta: IClientMeta | null;
    peerId: string;
    peerMeta: IClientMeta | null;
    handshakeId: number;
    handshakeTopic: string;
  }

  export interface IWalletConnectOptions {
    bridge?: string;
    uri?: string;
    session?: IWalletConnectSession;
    storage?: ISessionStorage;
    clientMeta?: IClientMeta;
    qrcodeModal?: IQRCodeModal;
    qrcodeModalOptions?: IQRCodeModalOptions;
  }

  export interface IConnectorOpts {
    cryptoLib: ICryptoLib;
    connectorOpts: IWalletConnectOptions;
    transport?: ITransportLib;
    sessionStorage?: ISessionStorage;
    pushServerOpts?: IPushServerOptions;
  }

  export interface IPushServerOptions {
    url: string;
    type: string;
    token: string;
    peerMeta?: boolean;
    language?: string;
  }

  export interface IPushSubscription {
    bridge: string;
    topic: string;
    type: string;
    token: string;
    peerName: string;
    language: string;
  }

  export interface IRequestOptions {
    forcePushNotification?: boolean;
    signingRequest?: boolean;
  }

  export interface IInternalRequestOptions extends IRequestOptions {
    topic: string;
  }

  export interface ICreateSessionOptions {
    chain: string;
  }

  export interface IQRCodeModal {
    open(uri: string, cb: any, opts?: any): void;
    close(): void;
  }

  export interface IQRCodeModalOptions {
    mobileLinks?: string[];
  }

  export interface IMobileRegistryEntry {
    name: string;
    shortName: string;
    color: string;
    logo: string;
    universalLink: string;
    deepLink: string;
  }
}
