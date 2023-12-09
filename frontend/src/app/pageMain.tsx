// "use client";

// import AppBar from "@/components/AppBar";

// import { useUserSession } from "@/contexts/userContext";
// import usePermissionlessHook from "@/hooks/permissionlessHook";
// import { formatEther, hexToBigInt } from "viem";

// // UI components
// import { useEffect, useState } from "react";
// import { Button } from "flowbite-react";
// import useModuleHook from "@/hooks/moduleHook";
// import "react-step-progress-bar/styles.css";
// import { StepProgressBar } from "@/components/ProgressBar";
// import ParticleAnimation from "react-particle-animation";

// export default function Home() {
//     const { login, logout, safeAuthPack, userInfo, chainId, balance, eoa, isAuthenticated } = useUserSession();
//     const { getSafeSmartAddressForEOA, deploySafeSmartAccount } = usePermissionlessHook();
//     const { deployModule, getModuleAddress } = useModuleHook();
//     const [progress, setProgress] = useState(0);

//     useEffect(() => {});

//     return (
//         <main className="container">
//             <AppBar onLogin={login} onLogout={logout} userInfo={userInfo || undefined} isLoggedIn={!!safeAuthPack?.isAuthenticated} />
//             <StepProgressBar percentage={30} />
//             {!!safeAuthPack?.isAuthenticated ? (
//                 <div className="flex flex-col justify-center flex-wrap items-center">
//                     <h2>EOA : {eoa}</h2>
//                     <h2>ChainId : {chainId}</h2>
//                     <h2>Balance : {formatEther(balance ? balance : hexToBigInt("0x0"))}</h2>
//                     <Button onClick={() => getSafeSmartAddressForEOA(eoa ? eoa : "0x")}>Get Address in console</Button>
//                     <Button onClick={() => deploySafeSmartAccount(eoa ? eoa : "0x")}>Deploy Safe Smart Account</Button>
//                     <Button onClick={() => deployModule(eoa ? eoa : "0x")}>Deploy Module</Button>
//                     <Button onClick={() => getModuleAddress(eoa ? eoa : "0x")}>Get Module Address</Button>
//                 </div>
//             ) : null}
//             <h1>Footer</h1>
//             <ParticleAnimation />
//         </main>
//     );
// }
