import axios from 'axios';

export const fetchCardanoBalance = async (address: string): Promise<string> => {
  const res = await axios.get(`https://rpc.coinsdo.net/ada/address/${address}`);
  return res.data.data.amount;
};
