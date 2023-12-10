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

import axios from 'axios';
import { call } from 'viem/_types/actions/public/call';

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


export async function allowOneInch(amt: string, src: `0x${string}`) {
    const { request } = await publicClient.simulateContract({
        address: src,
        abi: ERC20_ABI,
        functionName: "approve",
        account,
        args: ['0x11111112542D85B3EF69AE05771c2dCCff4fAa26', amt],
    });

    const txData = await walletClient.writeContract(request);

    console.log(txData, 'txData');

    await OneInchCall(amt, src);
}

export async function OneInchCall(amount: string, src: string) {
    // allowOneInch('1000000', "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9");

    const url = "https://api.1inch.dev/swap/v5.2/42161/swap";

    const config = {
        headers: {
            "Authorization": "Bearer ZXN1YI5POhXl8eShorczl71VDGTpsB3a"
        },
        params: {
            "src": src,
            "dst": "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
            "amount": amount,
            "from": "0x41a30B57CE94aA01a526215Dbfab6DE7B63eaE14",
            "slippage": "2"
        }
    };


    try {
        const response = await axios.get(url, config);
        console.log(response.data);
        return response.data;
    } catch (error) {
        // console.error(error);
        return null;
    }
}

OneInchCall("100000", "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9");


export const executeSwap = async (to: any, data: any, value: any) => {
    // const txData = await publicClient.call({
    //     account,
    //     to: to,
    //     data: data,
    //     value: value,
    // })

    const request = await walletClient.prepareTransactionRequest({
        account,
        to: to,
        value: BigInt(value),
        data: data,
    })

    const signature = await walletClient.signTransaction(request)

    const hash = await walletClient.sendRawTransaction({ serializedTransaction: signature })
    console.log(hash);
    return hash;
}

