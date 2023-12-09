import { create } from 'domain';
import { getContract, WalletClient, PublicClient, createPublicClient, http, createWalletClient, encodeFunctionData } from 'viem';
import { CHAIN_ID, CHAIN_NAME, RPC_URL, VIEM_CHAIN } from '../constants/constants';
import { privateKeyToAccount } from 'viem/accounts';

// ABIs
import { MODULE_FACTORY_ABI } from "../constants/abis/ModuleFactory";
import { BASE_MODULE_ABI } from "../constants/abis/BaseModule";
import { ISAFE_ABI } from '../constants/abis/ISafe';
import { ERC20_ABI } from '../constants/abis/ERC20';
import { getSafeModule } from './safeAPI';

const publicClient = createPublicClient({
    transport: http(RPC_URL),
    chain: VIEM_CHAIN
});

console.log('retest', process.env.PVT_KEY);
const account = privateKeyToAccount(process.env.PVT_KEY as `0x${string}`);


const walletClient = createWalletClient({
    transport: http(RPC_URL),
    chain: VIEM_CHAIN,
    account
});



export const getTransferTokenCalldata = async (safe: string, to: string, amount: string, token: string | null) => {
    // const moduleAddress = await getSafeModule(safe, CHAIN_NAME.toLowerCase());
    console.log(account.address);
    if (token == null) { // its an eth transfer
        const { request } = await publicClient.simulateContract({
            address: account.address,
            abi: BASE_MODULE_ABI,
            functionName: "_checkTransactionAndExecute",
            account,
            args: ['0x666a8E6F6f768D54D1B90a5195a36Cf370316066', '0x41a30B57CE94aA01a526215Dbfab6DE7B63eaE14', amount, '0x'],
        });
    } else { // its a token transfer
        const transferTokenCallData = encodeFunctionData({ abi: ERC20_ABI, functionName: 'transfer', args: ['0x41a30B57CE94aA01a526215Dbfab6DE7B63eaE14', 10 ^ 18] });

        console.log('adsd  ', transferTokenCallData);

        const { request } = await publicClient.simulateContract({
            address: '0xBdB2EDCcf443FA7ca2Ca3d0cae6d7E6859461143',
            abi: BASE_MODULE_ABI,
            functionName: "_checkTransactionAndExecute",
            account,
            args: ['0x966f7DA837BA5F1E573018F2897c9F02204aBaa5', '0x454e75BbCb620116b2B170671801a95227F29E56', 0, transferTokenCallData],
        });



        await walletClient.writeContract(request);
    }
}