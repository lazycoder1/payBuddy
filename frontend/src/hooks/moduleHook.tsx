// module factory deployed to 0xefdb51f5def28c91c1ae95dc0ac9dee381f26330;
"use client";
import { useState, useEffect } from "react";
import { Abi, createPublicClient, getContract, encodeFunctionData } from "viem";

// ABIs
import { MODULE_FACTORY_ABI } from "@/constants/abis/ModuleFactory";
import { BASE_MODULE_ABI } from "@/constants/abis/BaseModule";

// constants
import { MODULE_FACTORY_ADDRESS } from "@/constants/constants";

// permissionless
import usePermissionlessHook from "./permissionlessHook";
import { useUserSession } from "@/contexts/userContext";

const useModuleHook = () => {
    const { sendTransaction, getSafeSmartAddressForEOA } = usePermissionlessHook();
    const { publicClient } = useUserSession();

    const deployModule = async (eoa: string) => {
        if (publicClient == null) return;

        const safeAddress = await getSafeSmartAddressForEOA(eoa);

        console.log(safeAddress);

        const moduleFactoryContract = getContract({
            address: MODULE_FACTORY_ADDRESS,
            abi: MODULE_FACTORY_ABI,
            publicClient,
        });

        console.log("hrere 11");

        const { request } = await publicClient.simulateContract({
            address: MODULE_FACTORY_ADDRESS,
            abi: MODULE_FACTORY_ABI,
            functionName: "createModuleAndEnable",
            account: safeAddress as `0x${string}`,
            args: [safeAddress],
        });

        const callData = encodeFunctionData({
            abi: MODULE_FACTORY_ABI,
            functionName: "createModuleAndEnable",
            args: [safeAddress],
        });

        console.log("callData", callData);

        sendTransaction(eoa, MODULE_FACTORY_ADDRESS, "0", callData);
    };

    return { deployModule };
};

export default useModuleHook;
