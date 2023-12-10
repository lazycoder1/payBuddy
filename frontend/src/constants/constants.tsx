import { sepolia } from "wagmi";
import { arbitrum } from "viem/chains";

export const CHAIN_ID = arbitrum.id.toString();
// export const CHAIN_NAME = arbitrum.name;
export const CHAIN_NAME = "arbitrum";
export const VIEM_CHAIN = arbitrum;
export const RPC_URL = "https://arbitrum.llamarpc.com";

export const MODULE_FACTORY_ADDRESS = "0xefdb51f5def28c91c1ae95dc0ac9dee381f26330";
export const USDC_ADDRESS = "0xae6444fEb36d2B0e4Dc93f1f012882d7C5DB8F2D";
export const PREFFERED_ADDRESS = "0x41a30B57CE94aA01a526215Dbfab6DE7B63eaE14";
export const PREFFERED_CHAIN = sepolia.id.toString();

export const SAFE_TX_SERVICE_MAP: { [key: string]: string } = {
    sepolia: "https://safe-transaction-arbitrum.safe.global/",
};
