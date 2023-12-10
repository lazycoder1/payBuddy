import { sepolia, arbitrum } from "viem/chains";

export const CHAIN_ID = arbitrum.id.toString();
export const CHAIN_NAME = arbitrum.name;
export const VIEM_CHAIN = arbitrum;
export const RPC_URL = "https://arbitrum.llamarpc.com";

export const MODULE_FACTORY_ADDRESS = "0xefdb51f5def28c91c1ae95dc0ac9dee381f26330";

export const SAFE_TX_SERVICE_MAP: { [key: string]: string } = {
    sepolia: "https://safe-transaction-arbitrum.safe.global/",
}