"use client";
import { useState, useEffect } from "react";

import { googleWallet, facebookWallet, githubWallet, discordWallet, twitchWallet, twitterWallet } from "@zerodev/wagmi/rainbowkit";
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets, darkTheme } from "@rainbow-me/rainbowkit";
import { argentWallet, trustWallet, ledgerWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, sepolia, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { PublicClient, WalletClient } from "viem";

import { useWalletClient, useAccount, useConnect, usePublicClient } from "wagmi";
import { ALLOWED_CHAINS, CHAIN_ID } from "@/constants/constants";

const {
    chains,
    publicClient: PClient,
    webSocketPublicClient,
} = configureChains(ALLOWED_CHAINS, [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA as string })]);

const useWagmiHook = () => {
    const [eoa, setEoa] = useState<string | null>(null);
    const [chainId, setChainId] = useState<number | null>(null);
    const [balance, setBalance] = useState<bigint | null>(null);
    const [walletClient, setWalletClient] = useState<WalletClient | null>(null);
    // const [publicClient, setPublicClinet] = useState<PublicClient | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const { data: walletClientData, isError: walletClientIsError, isLoading: walletClientIsLoading } = useWalletClient();
    const { address: account, isConnected, connector } = useAccount();

    useEffect(() => {
        console.log("walletClientData", walletClientData);
        console.log("walletClientData != null", walletClientData != null);
        console.log("isConnected", isConnected);
        // console.log("publicClient", publicClient != null);
        console.log("account", account);
        console.log("account != undefined", account != undefined);

        if (walletClientData != null && account != undefined) {
            console.log("hererere");
            setWalletClient(walletClientData);
            // setPublicClinet(PClient({ chainId: ALLOWED_CHAINS[0].id }));

            PClient({ chainId: ALLOWED_CHAINS[0].id })
                .getBalance({
                    address: account,
                })
                .then((balance: bigint) => {
                    setBalance(balance);
                });

            walletClientData.getChainId().then((chainId: number) => {
                setChainId(chainId);
            });

            setEoa(account);
        }
    }, [isConnected, walletClientData]);

    return { chainId, balance, walletClient, isConnected, eoa };
};

export default useWagmiHook;
