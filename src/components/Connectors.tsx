import { useAccount, useConnect, useDisconnect } from "wagmi";

const styles = {
  btn: {
    padding: "2px 4px",
    margin: "0px 2px",
    background: "gainsboro",
    borderRadius: "3px"
  }
}

export function Connectors() {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <button onClick={disconnect as any}>
        disconnect
      </button>
    )
  }
  return (
    <div>
      {
        connectors.map((connector, idx) => {
          return (
            <button key={idx} style={styles.btn} onClick={() => connect({ connector })}>
              { connector.name }
            </button>
          )
        })
      }
    </div>
  )
}
