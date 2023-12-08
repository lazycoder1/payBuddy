"use client";
import { useState, useEffect } from "react";

import { useUserSession } from "../contexts/userContext";
import { signerToSafeSmartAccount } from "permissionless/accounts";
import { LocalAccount, WalletClient, createPublicClient, http, parseEther } from "viem";
import { createSmartAccountClient } from "permissionless";
import { createPimlicoPaymasterClient, createPimlicoBundlerClient } from "permissionless/clients/pimlico";
import { VIEM_CHAIN, CHAIN_NAME } from "@/constants/constants";

export const paymasterClient = createPimlicoPaymasterClient({
    transport: http(`https://api.pimlico.io/v2/${CHAIN_NAME.toLowerCase()}/rpc?apikey=API_KEY`),
});

export const bundlerClient = createPimlicoBundlerClient({
    transport: http("https://api.pimlico.io/v1/CHAIN/rpc?apikey=API_KEY"),
});

const usePermissionlessHook = () => {
    const { login, logout, safeAuthPack, publicClient, isAuthenticated, safeAuthSignInResponse, walletClient } = useUserSession();
    const [isPermissionlessInitiated, setPermissionlessInitiated] = useState(false);

    const getSafeSmartAccountClientForEOA = async (address: string) => {
        if (publicClient == null || address == null || !isPermissionlessInitiated || safeAuthSignInResponse == null) return "";

        const customSigner: Omit<LocalAccount<"custom">, "signTransaction"> = {
            address: address as `0x${string}`,
            publicKey: "0x00",
            source: "custom",
            type: "local",
            signMessage: async ({ message }: { message: any }) => {
                return "0x..";
            },
            signTypedData: async (typeData: any) => {
                let signedMessage;

                signedMessage = await walletClient?.signTypedData(typeData);

                return signedMessage != undefined ? signedMessage : "0x";
            },
        };

        const account = await signerToSafeSmartAccount(publicClient, {
            signer: customSigner,
            safeVersion: "1.4.1",
            entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
        });

        const smartWalletClient = createSmartAccountClient({
            account,
            chain: VIEM_CHAIN,
            transport: http("https://api.pimlico.io/v1/CHAIN/rpc?apikey=" + process.env.NEXT_PUBLIC_PIMLICO_API_KEY),
            sponsorUserOperation: paymasterClient.sponsorUserOperation,
        });

        return smartWalletClient;
    };

    const getSafeSmartAddressForEOA = async (address: string) => {
        const smartWalletClient = await getSafeSmartAccountClientForEOA(address);

        if (smartWalletClient == "") return "";

        const safeAccountAddress = smartWalletClient.account.address;

        return safeAccountAddress;
    };

    const deploySafeSmartAccount = async (address: string) => {
        const smartWalletClient = await getSafeSmartAccountClientForEOA(address);

        if (smartWalletClient == "") return "";

        const gasPrices = await bundlerClient.getUserOperationGasPrice();

        const txHash = await smartWalletClient.sendTransaction({
            to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
            value: parseEther("0.0"),
            maxFeePerGas: gasPrices.fast.maxFeePerGas, // if using Pimlico
            maxPriorityFeePerGas: gasPrices.fast.maxPriorityFeePerGas, // if using Pimlico
        });
    };

    // const customSigner: Omit<LocalAccount<"custom">, "signTransaction"> = {
    //     address: "0x00",
    //     publicKey: "0x00",
    //     source: "custom",
    //     type: "local",
    //     signMessage: async ({ message }: { message: any }) => {
    //         return "0x..";
    //     },
    //     signTypedData: async (typeData: any) => {
    //         return "0x00";
    //     },
    // };

    useEffect(() => {
        if (!!safeAuthPack?.isAuthenticated) {
            setPermissionlessInitiated(true);
        }
    }, [isAuthenticated]);

    return { isInitiated: isPermissionlessInitiated };
};

export default usePermissionlessHook;
