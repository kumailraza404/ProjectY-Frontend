import { Contract } from "@ethersproject/contracts";
import { ABI, Address } from "../constants";

const getContract = (provider: any) => {
  const protocolContract = new Contract(Address, ABI, provider?.getSigner());
  return protocolContract;
};

export default getContract;
