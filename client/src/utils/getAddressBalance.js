import { ethers } from "ethers";

export const getAccountBalance = async (ethereum, address) => {
  const provider = new ethers.providers.Web3Provider(ethereum);

  const balance = await provider.getBalance(address);
  const balanceEth = ethers.utils.formatEther(balance);

  return balanceEth;
};
