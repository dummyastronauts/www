import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { Body, Button, Header, WalletLabel } from "./components";
import useWeb3Modal from "./hooks/useWeb3Modal";

async function getEnsName(provider, address) {
  var name = await provider.lookupAddress(provider.provider.selectedAddress);
  return (name)
}

function WalletButton({ label, provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  return (
    <div>
      <Button
        onClick={() => {
          if (!provider) {
            loadWeb3Modal();
          } else {
            logoutOfWeb3Modal();
          }
        }}
      >
        {!provider ? "Connect Wallet" :  "Disconnect Wallet" }
      </Button>
      <WalletLabel>{label}</WalletLabel>
    </div>
  );
}

function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const [ensName, setEnsName] = useState("");

  if (provider) {
    getEnsName(provider, provider.provider.selectedAddress).then((ensName) => {
      if (ensName == null) {
        setEnsName(provider.provider.selectedAddress.substring(0,8));
      } else {
        setEnsName(ensName);
      }
    });
  }

  return (
    <div>
      <Header>
        <WalletButton label={ensName} provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal}  />
      </Header>
      <Body>
        <div className="wrapper">
          <div>
            <div>Coming soon...</div>
            {provider ? <div>Add your wallet address to the whitelist</div> : <div></div>}
          </div>
          <div>
            <img alt="Dummy Astronaut" width="200px" height="200px" src="NFT_Blue_01.png"></img>
          </div>
        </div>
      </Body>
    </div>
  );
}

export default App;
