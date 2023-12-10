"use client";
import dynamic from "next/dynamic";
import AppBar from "@/components/AppBar";

import { useUserSession } from "@/contexts/userContext";
// const {useUserSession} = dynamic(() => import( "@/contexts/userContext"), {
//     ssr: false,
// });
import usePermissionlessHook from "@/hooks/permissionlessHook";
import { formatEther, hexToBigInt } from "viem";
import { SafeAuthUserInfo } from "@safe-global/auth-kit";

// UI components
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import useModuleHook, { getSafeAddressIfDeployed } from "@/hooks/moduleHook";
import "react-step-progress-bar/styles.css";
import { StepProgressBar } from "@/components/ProgressBar";
import NavBar from "@/components/NavBar";
import PreDeployment from "@/components/PreDeployment";
import PostDeployment from "@/components/PostDeployment";

const style = {
    wrapper: `h-screen max-h-screen h-min-screen w-screen flex flex-col justify-between`,
};

export default function Home1() {
    if (typeof window == undefined) return null;
    const { login, logout, safeAuthPack, userInfo, chainId, balance, eoa, isAuthenticated } = useUserSession();
    const { getSafeSmartAddressForEOA, deploySafeSmartAccount } = usePermissionlessHook();
    const { deployModule, getModuleAddress } = useModuleHook();
    const [progress, setProgress] = useState(0);
    const [deployedSafe, setDeployedSafe] = useState<string | null>(null);
    const [deployedSafeTxHash, setDeployedSafeTxHash] = useState<string | null>(null);

    useEffect(() => {
        const setDeployedSafeIfDeployed = async () => {
            console.log("here");
            if (eoa == null) return;
            if (safeAuthPack == null) return;
            if (!!safeAuthPack?.isAuthenticated == false) return;
            console.log("herereee");
            const safeAddress = await getSafeSmartAddressForEOA(eoa);
            const safe = await getSafeAddressIfDeployed(safeAddress);
            if (safe != "") {
                setDeployedSafe(safe);
            }
        };

        setDeployedSafeIfDeployed();
    }, [safeAuthPack, eoa, getSafeSmartAddressForEOA]);

    return (
        <main className={style.wrapper}>
            <NavBar login={login} logout={logout} isLoggedIn={!!safeAuthPack?.isAuthenticated} safeAuthPack={safeAuthPack} />
            {!!deployedSafe ? (
                <PostDeployment safeAddress={deployedSafe} />
            ) : (
                <PreDeployment
                    login={login}
                    isLoggedIn={!!safeAuthPack?.isAuthenticated}
                    eoa={eoa}
                    deployModule={deploySafeSmartAccount}
                    setDeployedSafe={setDeployedSafe}
                />
            )}
            {!!safeAuthPack?.isAuthenticated && !!deployedSafe && (
                <Button onClick={() => deploySafeSmartAccount(eoa ? eoa : "0x")}>Deploy Safe Smart Account</Button>
            )}
        </main>
    );
}
