import { sepolia } from "wagmi";

export const CHAIN_ID = sepolia.id.toString();
export const CHAIN_NAME = sepolia.name;
export const VIEM_CHAIN = sepolia;
export const RPC_URL = "https://rpc.sepolia.org";

export const MODULE_FACTORY_ADDRESS = "0xf55434e6747a81e3de419538051e3ec67ea6cae7";
export const USDC_ADDRESS = "0xae6444fEb36d2B0e4Dc93f1f012882d7C5DB8F2D";
export const PREFFERED_ADDRESS = "0x41a30B57CE94aA01a526215Dbfab6DE7B63eaE14";
export const PREFFERED_CHAIN = sepolia.id.toString();

export const SAFE_TX_SERVICE_MAP: { [key: string]: string } = {
    sepolia: "https://safe-transaction-sepolia.safe.global/",
};
