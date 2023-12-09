import { createPublicClient, http } from "viem";
import { sepolia } from "wagmi";

export const CHAIN_ID = sepolia.id.toString();
export const CHAIN_NAME = sepolia.name;
export const VIEM_CHAIN = sepolia;
export const RPC_URL = "https://rpc.sepolia.org";

export const publicClient = createPublicClient({
    chain: VIEM_CHAIN,
    transport: http(RPC_URL),
});

export const ALLOWED_CHAINS = [sepolia];
