"use client";

import AppBar from "@/components/AppBar";

import { useUserSession } from "@/contexts/userContext";
import usePermissionlessHook from "@/hooks/permissionlessHook";
import { formatEther, hexToBigInt } from "viem";

// UI components
import { Button } from "flowbite-react";

const style = {
    wrapper: `h-screen max-h-screen h-min-screen w-screen bg-[#2d242f] text-white flex flex-col justify-between`,
};

export default function Home() {
    const { login, logout, safeAuthPack, userInfo, chainId, balance, eoa, isAuthenticated } = useUserSession();
    const { getSafeSmartAddressForEOA, deploySafeSmartAccount } = usePermissionlessHook();

    return (
        <main className={style.wrapper}>
            <AppBar onLogin={login} onLogout={logout} userInfo={userInfo || undefined} isLoggedIn={!!safeAuthPack?.isAuthenticated} />
            {!!safeAuthPack?.isAuthenticated ? (
                <div className="flex flex-col justify-center flex-wrap items-center">
                    <h2>EOA : {eoa}</h2>
                    <h2>ChainId : {chainId}</h2>
                    <h2>Balance : {formatEther(balance ? balance : hexToBigInt("0x0"))}</h2>
                    <Button onClick={() => getSafeSmartAddressForEOA(eoa ? eoa : "0x")}>Get Address in console</Button>
                    <Button onClick={() => deploySafeSmartAccount(eoa ? eoa : "0x")}>Deploy Safe Smart Account</Button>
                </div>
            ) : null}
            <h1>Footer</h1>
        </main>
    );
}
