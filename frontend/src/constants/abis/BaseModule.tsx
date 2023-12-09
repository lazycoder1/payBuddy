export const BASE_MODULE_ABI = [
    {
        inputs: [{ internalType: "contract ISafe", name: "_safe", type: "address" }],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "bytes", name: "data", type: "bytes" },
            { internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        name: "ExecutionFailure",
        type: "error",
    },
    { inputs: [], name: "ModuleMisconfigured", type: "error" },
    {
        inputs: [
            { internalType: "address", name: "safe", type: "address" },
            { internalType: "address", name: "executor", type: "address" },
        ],
        name: "NotSigner",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "forwarded", type: "address" }],
        name: "NotTrustedForwarded",
        type: "error",
    },
    {
        inputs: [],
        name: "safe",
        outputs: [{ internalType: "contract ISafe", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
];
