export const MODULE_FACTORY_ABI = [
    {
        inputs: [
            {
                internalType: "enum ModuleFactory.ModuleType",
                name: "moduleType",
                type: "uint8",
            },
            {
                internalType: "address",
                name: "deployer",
                type: "address",
            },
        ],
        name: "NoSupportedModuleType",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "safe",
                type: "address",
            },
            {
                internalType: "address",
                name: "executor",
                type: "address",
            },
        ],
        name: "NotSigner",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "module",
                type: "address",
            },
            {
                indexed: false,
                internalType: "enum ModuleFactory.ModuleType",
                name: "moduleType",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "address",
                name: "deployer",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "ModuleDeployed",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "contract ISafe",
                name: "safe",
                type: "address",
            },
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                internalType: "string",
                name: "chainId",
                type: "string",
            },
            {
                internalType: "address",
                name: "prefferedAddress",
                type: "address",
            },
        ],
        name: "createModuleAndEnable",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract ISafe",
                name: "",
                type: "address",
            },
        ],
        name: "safeToModule",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
