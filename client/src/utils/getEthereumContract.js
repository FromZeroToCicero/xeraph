import { ethers } from "ethers";

import { contractABI, contractAddress } from "./constants";

export const getEthereumContract = (ethereum) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};
