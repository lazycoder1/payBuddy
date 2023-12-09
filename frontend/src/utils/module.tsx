import { PublicClient } from "viem";
import { MODULE_FACTORY_ADDRESS } from "../constants/constants";
import { MODULE_FACTORY_ABI } from "../constants/abis/ModuleFactory";
import { readContract } from "viem/actions";

export const getModuleAddressForSafe = async (safeAddress: string, publicClient: PublicClient) => {
    const response = await publicClient.readContract({
        address: MODULE_FACTORY_ADDRESS,
        abi: MODULE_FACTORY_ABI,
        functionName: "safeToModule",
        args: [safeAddress],
    });

    console.log(response);
};
