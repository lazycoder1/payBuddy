"use client";
import { createContext, useContext, useState } from "react";

import { SafeAuthPack, SafeAuthConfig, SafeAuthInitOptions, SafeAuthUserInfo } from "@safe-global/auth-kit";
import { AuthKitSignInData } from "@safe-global/auth-kit"; // Add missing import

import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { BrowserProvider, Eip1193Provider, ethers } from "ethers";

import { sign } from "crypto";
import { Button } from "flowbite-react";
import { useEffect } from "react";

import { createPublicClient, http, custom, createWalletClient, formatEther, hexToBigInt, PublicClient, WalletClient } from "viem";
import { sepolia } from "viem/chains";

import { RPC_URL } from "../constants/constants";

const UserSessionContext = createContext({} as UserSession);

export interface UserSession {
    login: () => void;
    logout: () => void;
    userInfo: SafeAuthUserInfo | null;
    chainId: string | null;
    balance: bigint | null;
    isAuthenticated: boolean;
    safeAuthPack: SafeAuthPack | null;
    safeAuthSignInResponse: any;
    eoa: string | null;
    publicClient: PublicClient | null;
    walletClient: WalletClient | null;
    provider: any;
}

// Making the function which will wrap the whole app using Context Provider
export default function UserSessionStore({ children }: any) {
    const [safeAuthPack, setSafeAuthPack] = useState<SafeAuthPack | null>(null);
    const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<AuthKitSignInData | null | undefined>(null);
    const [eoa, setEoa] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<SafeAuthUserInfo | null>(null);
    const [chainId, setChainId] = useState<string | null>(null);
    const [balance, setBalance] = useState<bigint | null>(null);
    const [walletClient, setWalletClient] = useState<any>(null);
    const [publicClient, setPublicClinet] = useState<any>(null);
    const [provider, setProvider] = useState<any>(null);

    useEffect(() => {
        if (safeAuthSignInResponse == null) return;
        // console.log("safeAuthSignInResponse", safeAuthSignInResponse);
        setEoa(safeAuthSignInResponse?.eoa);
    }, [safeAuthSignInResponse]);

    useEffect(() => {
        // @ts-expect-error - Missing globals
        const params = new URL(window.document.location).searchParams;
        const chainId = params.get("chainId");

        const safeAuthConfig: SafeAuthConfig = {
            txServiceUrl: "https://safe-transaction-base-goerli.safe.global",
        };

        (async () => {
            const options: SafeAuthInitOptions = {
                enableLogging: true,
                buildEnv: "production",
                chainConfig: {
                    chainId: chainId || "0xaa36a7",
                    rpcTarget: RPC_URL,
                },
            };

            const authPack = new SafeAuthPack(safeAuthConfig);

            await authPack.init(options);

            // console.log("safeAuthPack:safeEmbed", authPack.safeAuthEmbed);

            setSafeAuthPack(authPack);

            authPack.subscribe("accountsChanged", async (accounts) => {
                // console.log("safeAuthPack:accountsChanged", accounts, authPack.isAuthenticated);
                if (authPack.isAuthenticated) {
                    const signInInfo = await authPack?.signIn();

                    setSafeAuthSignInResponse(signInInfo);
                    setIsAuthenticated(true);
                }
            });

            authPack.subscribe("chainChanged", (eventData) => console.log("safeAuthPack:chainChanged", eventData));
        })();
    }, []);

    useEffect(() => {
        if (!safeAuthPack || !isAuthenticated) return;
        (async () => {
            const web3Provider = safeAuthPack.getProvider();
            const userInfo = await safeAuthPack.getUserInfo();

            setUserInfo(userInfo);

            if (web3Provider) {
                const [account] = await web3Provider.request({ method: "eth_requestAccounts" });

                const publicClient = createPublicClient({
                    chain: sepolia,
                    transport: http(RPC_URL),
                });

                const walletClient = createWalletClient({
                    account,
                    chain: sepolia,
                    transport: custom(web3Provider),
                });

                setChainId((await walletClient.getChainId()).toString());
                const addresses = await walletClient.getAddresses(); // Await getAddresses() function
                const balance = await publicClient.getBalance({
                    address: addresses[0],
                });

                setBalance(balance);
                setWalletClient(walletClient);
                setPublicClinet(publicClient);

                const provider = new BrowserProvider(safeAuthPack.getProvider() as Eip1193Provider);
                const signer = await provider.getSigner();
                const signerAddress = await signer.getAddress();

                // setChainId((await provider?.getNetwork()).chainId.toString());
                // setBalance(ethers.formatEther((await provider.getBalance(signerAddress)) as ethers.BigNumberish));
                setProvider(provider);
            }
        })();
    }, [isAuthenticated, safeAuthPack]);

    const login = async () => {
        const signInInfo = await safeAuthPack?.signIn();

        setSafeAuthSignInResponse(signInInfo);

        console.log(signInInfo);

        setIsAuthenticated(true);
    };

    const logout = async () => {
        await safeAuthPack?.signOut();

        setSafeAuthSignInResponse(null);
    };

    const getUserInfo = async () => {
        const userInfo = await safeAuthPack?.getUserInfo();
    };

    return (
        <UserSessionContext.Provider
            value={{
                login,
                logout,
                isAuthenticated,
                userInfo,
                chainId,
                balance,
                eoa,
                safeAuthPack,
                safeAuthSignInResponse,
                publicClient,
                walletClient,
                provider,
            }}
        >
            {children}
        </UserSessionContext.Provider>
    );
}

// Make useUserSession Hook to easily use our context throughout the application
export function useUserSession() {
    return useContext(UserSessionContext);
}
