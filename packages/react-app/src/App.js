import React, { useState } from "react";
import Davatar from '@davatar/react';

import { Body, Button } from "./components";
import useWeb3Modal from "./hooks/useWeb3Modal";

async function getEnsName(provider, address) {
  var name = await provider.lookupAddress(provider.provider.selectedAddress);
  return (name)
}

function WalletButton({ label, provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  var address = ""
  if (provider) {
    address = provider.provider.selectedAddress
  }
  return (
    <div className="header">
      <div className="headerleft">
        <div><Davatar
          size={40}
          provider={provider}
          address={address}
          generatedAvatarType="blockies"
        /></div>
        <div>{label}</div>
      </div>
      <div className="headerright">
        <div><Button
          onClick={() => {
            if (!provider) {
              loadWeb3Modal();
            } else {
              logoutOfWeb3Modal();
            }
          }}
        >
          {!provider ? "Connect Wallet" :  "Disconnect Wallet" }
        </Button></div>
      </div>
    </div>
  );
}

function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const [wallet, setWallet] = useState("");

  if (provider) {
    getEnsName(provider, provider.provider.selectedAddress).then((ensName) => {
      if (ensName == null) {
        setWallet(provider.provider.selectedAddress.substring(0,21));
      } else {
        setWallet(ensName);
      }
    });
  }

  return (
    <div>
      <div>
        <WalletButton label={wallet} provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal}  />
      </div>
      <Body>
        <div className="wrapper">
          <div>
            <div>Coming soon...</div>
            {provider ? <div>Add your wallet address to the whitelist</div> : <div></div>}
          </div>
          <div>
            <img alt="Dummy Astronaut" width="300px" height="300px" src="NFT_Blue_01.png"></img>
          </div>
        </div>
      </Body>
    </div>
  );
}

export default App;
