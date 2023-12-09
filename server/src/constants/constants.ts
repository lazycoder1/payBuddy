import { sepolia } from "viem/chains";

export const CHAIN_ID = sepolia.id.toString();
export const CHAIN_NAME = sepolia.name;
export const VIEM_CHAIN = sepolia;
export const RPC_URL = "https://rpc.sepolia.org";

export const MODULE_FACTORY_ADDRESS = "0xefdb51f5def28c91c1ae95dc0ac9dee381f26330";

export const SAFE_TX_SERVICE_MAP: { [key: string]: string } = {
    sepolia: "https://safe-transaction-sepolia.safe.global/",
}