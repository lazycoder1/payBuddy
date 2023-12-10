// module factory deployed to 0xefdb51f5def28c91c1ae95dc0ac9dee381f26330;
"use client";
import { useState, useEffect } from "react";
import { Abi, createPublicClient, getContract, encodeFunctionData } from "viem";

// ABIs
import { MODULE_FACTORY_ABI } from "@/constants/abis/ModuleFactory";
import { BASE_MODULE_ABI } from "@/constants/abis/BaseModule";

// constants
import { CHAIN_ID, MODULE_FACTORY_ADDRESS, PREFFERED_ADDRESS, PREFFERED_CHAIN, USDC_ADDRESS } from "@/constants/constants";

// permissionless
import usePermissionlessHook from "./permissionlessHook";
import { useUserSession } from "@/contexts/userContext";
import { ISAFE_ABI } from "@/constants/abis/ISafe";
import { getModuleAddressForSafe } from "@/utils/module";

// const getTxHashFromUserOp = (userOpHash) => {

// }

import { SAFE_TX_SERVICE_MAP } from "../constants/constants";
import axios from "axios";
import { getAddress } from "viem";
import { SafeCreationInfoResponse } from "@safe-global/api-kit";
import SafeApiKit from "@safe-global/api-kit";

const safeApiKit = new SafeApiKit({
    chainId: BigInt(CHAIN_ID),
});

export const getSafeAddressIfDeployed = async (safe: string) => {
    safe = getAddress(safe);

    try {
        const safeCreationInfo: SafeCreationInfoResponse = await safeApiKit.getSafeCreationInfo(safe);
    } catch (e) {
        return "";
    }
    // console.log("safeCreatingInfo", safeCreationInfo);

    return safe;
};

const useModuleHook = () => {
    const { sendTransaction, getSafeSmartAddressForEOA } = usePermissionlessHook();
    const { publicClient } = useUserSession();

    const deployModule = async (eoa: string) => {
        if (publicClient == null) return;

        const safeAddress = await getSafeSmartAddressForEOA(eoa);

        console.log(safeAddress);

        // const moduleFactoryContract = getContract({
        //     address: MODULE_FACTORY_ADDRESS,
        //     abi: MODULE_FACTORY_ABI,
        //     publicClient,
        // });

        // const { request } = await publicClient.simulateContract({
        //     address: MODULE_FACTORY_ADDRESS,
        //     abi: MODULE_FACTORY_ABI,
        //     functionName: "createModuleAndEnable",
        //     account: safeAddress as `0x${string}`,
        //     args: [safeAddress],
        // });

        // console.log("wtf");

        const callData = encodeFunctionData({
            abi: MODULE_FACTORY_ABI,
            functionName: "createModuleAndEnable",
            args: [safeAddress, USDC_ADDRESS, PREFFERED_CHAIN, PREFFERED_ADDRESS],
        });

        console.log("callData", callData);

        const moduleMintTxHash = sendTransaction(eoa, MODULE_FACTORY_ADDRESS, "0", callData);

        return [safeAddress, moduleMintTxHash];
    };

    const getModuleAddress = async (eoa: string) => {
        if (publicClient == null) return;
        const safeAddress = await getSafeSmartAddressForEOA(eoa);

        console.log(safeAddress);

        const moduleAddress = getModuleAddressForSafe(safeAddress, publicClient);
    };

    const enableModule = async (eoa: string) => {
        if (publicClient == null) return;
        const safeAddress = await getSafeSmartAddressForEOA(eoa);

        const moduleAddress = getModuleAddressForSafe(safeAddress, publicClient);

        const callData = encodeFunctionData({
            abi: ISAFE_ABI,
            functionName: "enableModule",
            args: [moduleAddress],
        });

        sendTransaction(eoa, MODULE_FACTORY_ADDRESS, "0", callData);
    };

    // const removeModule = async (eoa: string) => {
    //     if (publicClient == null) return;

    //     const safeAddress = await getSafeSmartAddressForEOA(eoa);

    //     console.log(safeAddress);

    //     const callData = encodeFunctionData({
    //         abi: ISAFE_ABI,
    //         functionName: "disableModule",
    //         args: ["0x39E54Bb2b3Aa444b4B39DEe15De3b7809c36Fc38", "0x41a30B57CE94aA01a526215Dbfab6DE7B63eaE14"],
    //     });

    //     console.log("callData", callData);

    //     sendTransaction(eoa, MODULE_FACTORY_ADDRESS, "0", callData);
    // };

    // const removeMoule2 = async (eoa: string) => {
    //     if (publicClient == null) return;

    const checkIfSafeIsDeployed = async (eoa: string) => {
        if (publicClient == null) return;
        const safeAddress = await getSafeSmartAddressForEOA(eoa);

        const safeData = getSafeAddressIfDeployed;
    };

    return { deployModule, getModuleAddress };
};

export default useModuleHook;
