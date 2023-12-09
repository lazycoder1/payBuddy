import { SAFE_TX_SERVICE_MAP } from "../constants/constants";
import axios from "axios";
import { getAddress } from 'viem'

export const getSafeModule = async (safe: string, network: string) => {
    safe = getAddress(safe);
    const safeTxService = SAFE_TX_SERVICE_MAP[network];
    const res = await axios.get(`${safeTxService}api/v1/safes/${safe}/`);

    if ('modules' in res?.data && res.data.modules.length > 0) {
        return res.data.modules[0];
    } else {
        return null;
    }
}