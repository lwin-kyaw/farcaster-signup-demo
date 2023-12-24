import { SubVerifierDetailsParams, WEB3AUTH_NETWORK, Web3AuthMPCCoreKit } from "@web3auth/mpc-core-kit"
import { useEffect, useState } from "react"

export function MpcCoreKitLogin() {

  const [coreKit, setCoreKit] = useState<Web3AuthMPCCoreKit | undefined>();

  const web3aLogin = async () => {
    try {
      if (!coreKit) {
        console.warn("Mpc Corekit instance not found!");
        return
      }
      await coreKit.init();
      const verifierConfig = {
        subVerifierDetails: {
          typeOfLogin: 'google',
          verifier: 'w3a-google-demo',
          clientId:
            '519228911939-cri01h55lsjbsia1k7ll6qpalrus75ps.apps.googleusercontent.com',
        }
      } as SubVerifierDetailsParams;
  
      await coreKit.loginWithOauth(verifierConfig);
  
      console.log("coreKit::state", coreKit.state);
      console.log("coreKit::Status", coreKit.status);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (!coreKit) {
      const mpcCoreKit = new Web3AuthMPCCoreKit({
        web3AuthClientId: "client-id",
        web3AuthNetwork: WEB3AUTH_NETWORK.DEVNET,
        uxMode: "redirect"
      });
      setCoreKit(mpcCoreKit);
    }
  }, [coreKit]);

  return (
    <button
    onClick={web3aLogin}
    style={{ background: "gainsboro", padding: "2px 5px", borderRadius: "5px" }}
    >
      Web3Auth connect
    </button>
  )
}
