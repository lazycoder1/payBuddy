import { create } from 'domain';
import { getContract, WalletClient, PublicClient, createPublicClient, http, createWalletClient, encodeFunctionData } from 'viem';
import { CHAIN_ID, RPC_URL, VIEM_CHAIN } from '../constants/constants';
import { privateKeyToAccount } from 'viem/accounts';

// ABIs
import { MODULE_FACTORY_ABI } from "../constants/abis/ModuleFactory";
import { BASE_MODULE_ABI } from "../constants/abis/BaseModule";
import { ISAFE_ABI } from '../constants/abis/ISafe';
import { ERC20_ABI } from '../constants/abis/ERC20';



const publicClient = createPublicClient({
    transport: http(RPC_URL),
    chain: VIEM_CHAIN
});

const account = privateKeyToAccount(process.env.PVT_KEY as `0x${string}`);

const walletClient = createWalletClient({
    transport: http(RPC_URL),
    chain: VIEM_CHAIN,
    account
});



// export const getTransferTokenCalldata = async (safe: string, to: string, amount: string, token: string | null) => {
//     if (token == null) { // its an eth transfer
        
//     } else { // its a token transfer
//         console.log('implement');
//     }
// }