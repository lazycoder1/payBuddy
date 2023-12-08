"use client";
import { useState, useEffect } from "react";

import { useUserSession } from "../contexts/userContext";
import { signerToSafeSmartAccount } from "permissionless/accounts";
import { LocalAccount, WalletClient, createPublicClient, http, parseEther } from "viem";
import { createSmartAccountClient } from "permissionless";
import { createPimlicoPaymasterClient, createPimlicoBundlerClient } from "permissionless/clients/pimlico";
import { VIEM_CHAIN, CHAIN_NAME } from "@/constants/constants";

const PIMLICO_URL_V2 = `https://api.pimlico.io/v2/${CHAIN_NAME.toLowerCase()}/rpc?apikey=` + process.env.NEXT_PUBLIC_PIMLICO_API_KEY;
const PIMLICO_URL_V1 = `https://api.pimlico.io/v1/${CHAIN_NAME.toLowerCase()}/rpc?apikey=` + process.env.NEXT_PUBLIC_PIMLICO_API_KEY;

export const paymasterClient = createPimlicoPaymasterClient({
    transport: http(PIMLICO_URL_V2),
});

export const bundlerClient = createPimlicoBundlerClient({
    transport: http(PIMLICO_URL_V1),
});

const usePermissionlessHook = () => {
    const { login, logout, safeAuthPack, publicClient, isAuthenticated, safeAuthSignInResponse, walletClient, provider } = useUserSession();
    // const [isPermissionlessInitiated, setPermissionlessInitiated] = useState(false);

    const getSafeSmartAccountClientForEOA = async (address: string) => {
        console.log("nothing? values needed here", publicClient, address, !safeAuthPack?.isAuthenticated, safeAuthSignInResponse);
        if (publicClient == null || address == null || !safeAuthPack?.isAuthenticated || safeAuthSignInResponse == null) return "";

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

                // let signedMessage;

                const params = {
                    typeData,
                    from: safeAuthSignInResponse?.eoa,
                };

                console.log("typedData", typeData);
                // signedMessage = await walletClient?.signTypedData(typeData);
                // signedMessage = await (await provider?.getSigner())?.signMessage(typeData);
                console.log("testing chain ", await provider?.getNetwork());
                signedMessage = await provider?.send("eth_signTypedData_v4", [params.from, typeData]);

                console.log("signedMessage", signedMessage);

                return signedMessage != undefined ? signedMessage : "0x";
            },
        };
        console.log("here 1");

        const account = await signerToSafeSmartAccount(publicClient, {
            signer: customSigner,
            safeVersion: "1.4.1",
            entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
        });

        console.log("here 2");

        const smartWalletClient = createSmartAccountClient({
            account,
            chain: VIEM_CHAIN,
            transport: http(PIMLICO_URL_V2),
            sponsorUserOperation: paymasterClient.sponsorUserOperation,
        });

        console.log("here 3");

        return smartWalletClient;
    };

    const getSafeSmartAddressForEOA = async (address: string) => {
        const smartWalletClient = await getSafeSmartAccountClientForEOA(address);

        if (smartWalletClient == "") return "";

        const safeAccountAddress = smartWalletClient.account.address;
        console.log("safeAccountAddress", safeAccountAddress);
        return safeAccountAddress;
    };

    const deploySafeSmartAccount = async (address: string) => {
        const smartWalletClient = await getSafeSmartAccountClientForEOA(address);

        if (smartWalletClient == "") return "";

        const gasPrices = await bundlerClient.getUserOperationGasPrice();

        console.log("safeAccountAddress", smartWalletClient.account.address);

        const txHash = await smartWalletClient.sendTransaction({
            to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
            value: parseEther("0.0"),
            maxFeePerGas: gasPrices.fast.maxFeePerGas, // if using Pimlico
            maxPriorityFeePerGas: gasPrices.fast.maxPriorityFeePerGas, // if using Pimlico
        });

        console.log("txHash", txHash);
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

    return { getSafeSmartAddressForEOA, deploySafeSmartAccount };
};

export default usePermissionlessHook;
