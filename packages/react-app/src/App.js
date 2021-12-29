import React, { useState } from "react";
import Davatar from '@davatar/react';

import { Button, Link } from "./components";
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
      {
        address ? 
        <div className="headerleft">
          <div><Davatar
            size={50}
            provider={provider}
            address={address}
            generatedAvatarType="blockies"
          /></div>
          <div>{label}</div>
        </div>
        :
        <div className="headerleft">
        </div>
      }
      <div className="headerright">
        <div className="socials">
            <Link href="https://instagram.com/dummyastronauts/"><i className="fab fa-instagram"></i></Link>
            <Link href="https://twitter.com/dummyastronauts"><i className="fab fa-twitter"></i></Link>
            <Link href="https://discord.gg/uy32CTV82a"><i className="fab fa-discord"></i></Link>
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
        </div>
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
    <div className="app">
      <div>
        <WalletButton label={wallet} provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal}  />
      </div>
      <div className="body">
          <div>Coming soon...</div>
          {provider ? <div><Button disabled> {"Join the waitlist"} </Button></div> : <div></div>}
      </div>
      <div className="footer">
      </div>
    </div>
  );
}

export default App;
