export const BASE_MODULE_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "ExecutionFailure",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ModuleMisconfigured",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "safe",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "executor",
                "type": "address"
            }
        ],
        "name": "NotSigner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "forwarded",
                "type": "address"
            }
        ],
        "name": "NotTrustedForwarded",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "contract ISafe",
                "name": "safe",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "_checkTransactionAndExecute",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract ISafe",
                "name": "safe",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "_checkTransactionAndExecuteReturningData",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "moduleOwner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "prefferedAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "prefferedChainId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "prefferedToken",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "safe",
        "outputs": [
            {
                "internalType": "contract ISafe",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_prefferedAddress",
                "type": "address"
            }
        ],
        "name": "setPrefferedAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_prefferedChainId",
                "type": "uint256"
            }
        ],
        "name": "setPrefferedChainId",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_prefferedToken",
                "type": "address"
            }
        ],
        "name": "setPrefferedToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]