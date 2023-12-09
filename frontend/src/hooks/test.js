const data = {
    domain: { chainId: 11155111, verifyingContract: "0x39E54Bb2b3Aa444b4B39DEe15De3b7809c36Fc38" },
    primaryType: "SafeOp",
    types: {
        SafeOp: [
            { type: "address", name: "safe" },
            { type: "bytes", name: "callData" },
            { type: "uint256", name: "nonce" },
            { type: "uint256", name: "preVerificationGas" },
            { type: "uint256", name: "verificationGasLimit" },
            { type: "uint256", name: "callGasLimit" },
            { type: "uint256", name: "maxFeePerGas" },
            { type: "uint256", name: "maxPriorityFeePerGas" },
            { type: "address", name: "entryPoint" },
        ],
    },
    message: {
        safe: "0xAfa0b374e159088ecc7DAF4e37Ecf8aCEf5d550c",
        callData:
            "0x7bb37428000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa960450000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        nonce: "0",
        preVerificationGas: "51136",
        verificationGasLimit: "550372",
        callGasLimit: "79688",
        maxFeePerGas: "120162930",
        maxPriorityFeePerGas: "120162930",
        entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    },
};
