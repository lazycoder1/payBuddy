"use client";

import React, { useEffect, useState, useContext } from "react";

import { googleWallet, facebookWallet, githubWallet, discordWallet, twitchWallet, twitterWallet } from "@zerodev/wagmi/rainbowkit";
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets, darkTheme } from "@rainbow-me/rainbowkit";
import { argentWallet, trustWallet, ledgerWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, sepolia, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { ALLOWED_CHAINS } from "../constants/constants";

import { useWalletClient, useAccount, useConnect, usePublicClient } from "wagmi";

const ZERO_DEV_KEY = process.env.NEXT_PUBLIC_ZERODEV as string;

const projectId = process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID as string;

console.log(projectId);

const demoAppInfo = {
    appName: "Rainbowkit Demo",
};

const connectors = connectorsForWallets([
    {
        groupName: "Social",
        wallets: [
            googleWallet({ chains: ALLOWED_CHAINS, options: { projectId: ZERO_DEV_KEY } }),
            facebookWallet({ chains: ALLOWED_CHAINS, options: { projectId: ZERO_DEV_KEY } }),
            githubWallet({ chains: ALLOWED_CHAINS, options: { projectId: ZERO_DEV_KEY } }),
            discordWallet({ chains: ALLOWED_CHAINS, options: { projectId: ZERO_DEV_KEY } }),
            twitchWallet({ chains: ALLOWED_CHAINS, options: { projectId: ZERO_DEV_KEY } }),
            twitterWallet({ chains: ALLOWED_CHAINS, options: { projectId: ZERO_DEV_KEY } }),
        ],
    },
]);

const { chains, publicClient, webSocketPublicClient } = configureChains(ALLOWED_CHAINS, [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA as string }),
]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
                theme={darkTheme({
                    borderRadius: "none",
                })}
                chains={chains}
                appInfo={demoAppInfo}
            >
                {mounted && children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
}
