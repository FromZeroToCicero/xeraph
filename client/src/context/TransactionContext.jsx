import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAlert } from "react-alert";

import { getEthereumContract } from "../utils/getEthereumContract";
import { getAccountBalance } from "../utils/getAddressBalance";

const { ethereum } = window;

export const TransactionContext = React.createContext();

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionCount, setTransactionCount] = useState(0);
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const alert = useAlert();

  const handleFormFieldChange = (e, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum)
        return alert.error("Please install Metamask Chrome Extension");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setConnectedAccount(accounts[0]);

        const balanceEth = await getAccountBalance(ethereum, accounts[0]);

        setAccountBalance(balanceEth);

        getAllTransactions();
      } else {
        console.warn("No crypto accounts found");
      }
    } catch (error) {
      console.error(error);
      alert.error("No ethereum object found");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum)
        return alert.error("Please install Metamask Chrome Extension");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setConnectedAccount(accounts[0]);

      const balanceEth = await getAccountBalance(ethereum, accounts[0]);

      setAccountBalance(balanceEth);

      getAllTransactions();
    } catch (error) {
      console.error(error);
      alert.error("No ethereum object found");
    }
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum)
        return alert.error("Please install Metamask Chrome Extension");

      const transactionsContract = getEthereumContract(ethereum);
      const availableTransactions =
        await transactionsContract.getAllTransactions();

      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );

      const transactionCount = await transactionsContract.getTransactionCount();

      setTransactions(structuredTransactions);
      setTransactionCount(transactionCount);
    } catch (error) {
      console.error(error);
      alert.error("No ethereum object found");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum)
        return alert.error("Please install Metamask Chrome Extension");

      const { addressTo, amount, keyword, message } = formData;

      const transactionsContract = getEthereumContract(ethereum);
      const parsedAmount = ethers.utils.parseEther(amount);

      // Send amount to receiver
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: "0x5208", // hex code for 21000 gas
            value: parsedAmount._hex,
          },
        ],
      });

      setIsLoading(true);

      // Store transaction in blockchain
      const transactionHash = await transactionsContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      await transactionHash.wait();

      setIsLoading(false);

      const newTransactionCount =
        await transactionsContract.getTransactionCount();

      setTransactionCount(newTransactionCount.toNumber());

      location.reload();
    } catch (error) {
      console.error(error);
      alert.error("No ethereum object found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        formData,
        handleFormFieldChange,
        connectedAccount,
        accountBalance,
        connectWallet,
        transactions,
        transactionCount,
        sendTransaction,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
