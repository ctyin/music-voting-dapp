import React, { useEffect, useState } from "react";
import TruffleContract from "@truffle/contract";
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import "./App.css";

function App() {
  const [web3, setWeb3] = useState();
  const [accounts, setAccounts] = useState();
  const [contract, setContract] = useState();
  const [storageValue, setStorageValue] = useState();

  const runExample = async () => {
    // Stores a given value, 5 by default.
    await contract.methods.set(30).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    setStorageValue(response);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const tempAccts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = VotingContract.networks[networkId];
        const instance = new web3.eth.Contract(
          VotingContract.abi,
          deployedNetwork && deployedNetwork.address
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(web3);
        setAccounts(tempAccts);
        setContract(instance);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(2);

    if (contract) {
      runExample();
    }
  }, [contract]);

  return (
    <div className="App">
      <h1>Good to Go!</h1>
      <p>Your Truffle Box is installed and ready.</p>
      <h2>Smart Contract Example</h2>
      <p>
        If your contracts compiled and migrated successfully, below will show a
        stored value of 5 (by default).
      </p>
      <p>
        Try changing the value stored on <strong>line 40</strong> of App.js.
      </p>
      <div>The stored value is: {storageValue}</div>
    </div>
  );
}

export default App;
