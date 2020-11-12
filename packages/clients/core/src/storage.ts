import { IWalletConnectSession } from "@unifiedwalletconnect/types";
import { isWalletConnectSession, getLocal, setLocal, removeLocal } from "@unifiedwalletconnect/utils";

class SessionStorage {
  public storageId = "walletconnect";

  public getSession(): IWalletConnectSession | null {
    let session: IWalletConnectSession | null = null;
    const json = getLocal(this.storageId);
    if (json && isWalletConnectSession(json)) {
      session = json;
    }
    return session;
  }

  public setSession(session: IWalletConnectSession): IWalletConnectSession {
    setLocal(this.storageId, session);
    return session;
  }

  public removeSession(): void {
    removeLocal(this.storageId);
  }
}

export default SessionStorage;
