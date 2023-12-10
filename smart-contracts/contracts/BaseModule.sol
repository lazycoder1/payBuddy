// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./interfaces/ISafe.sol";
import "./interfaces/IERC20.sol";

contract BaseModule {
    ////////////////////////////////////////////////////////////////////////////
    // CONSTANTS
    ////////////////////////////////////////////////////////////////////////////
    address internal constant PUSH_COMM =
        0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa;

    // https://docs.gelato.network/developer-services/relay/quick-start/erc-2771#3.-re-deploy-your-contract-and-whitelist-gelatorelayerc2771
    address internal GELATO_TRUSTED_FORWARDED =
        0xaBcC9b596420A9E9172FD5938620E265a0f9Df92;

    ////////////////////////////////////////////////////////////////////////////
    // VARIABLES & CONSTRCUTOR
    ////////////////////////////////////////////////////////////////////////////

    ISafe public safe;
    
    address public moduleOwner = 0x41a30B57CE94aA01a526215Dbfab6DE7B63eaE14;

    mapping (address => address) public prefferedAddress;
    mapping (address => uint256) public prefferedChainId;
    mapping (address => address) public prefferedToken;


    ////////////////////////////////////////////////////////////////////////////
    // ERRORS
    ////////////////////////////////////////////////////////////////////////////

    error ExecutionFailure(address to, bytes data, uint256 timestamp);

    error ModuleMisconfigured();

    error NotSigner(address safe, address executor);

    error NotTrustedForwarded(address forwarded);

    ////////////////////////////////////////////////////////////////////////////
    // MODIFIER
    ////////////////////////////////////////////////////////////////////////////

    modifier isSigner() {
        address[] memory signers = safe.getOwners();
        bool isOwner;
        for (uint256 i; i < signers.length; i++) {
            if (
                signers[i] == msg.sender ||
                GELATO_TRUSTED_FORWARDED == msg.sender
            ) {
                isOwner = true;
                break;
            }
        }
        if (!isOwner) revert NotSigner(address(safe), msg.sender);
        _;
    }

    modifier onlyModuleOwner() {
        require(msg.sender == moduleOwner, "Only module owner");
        _;
    }

    ////////////////////////////////////////////////////////////////////////////
    // INTERNAL
    ////////////////////////////////////////////////////////////////////////////

    /// @notice Allows executing specific calldata into an address thru a gnosis-safe, which have enable this contract as module.
    /// @param to Contract address where we will execute the calldata.
    /// @param data Calldata to be executed within the boundaries of the `allowedFunctions`.
    function _checkTransactionAndExecute(
        ISafe safe,
        address to,
        uint256 value,
        bytes memory data
    ) external onlyModuleOwner {
        if (data.length >= 4) {
            bool success = safe.execTransactionFromModule(
                to,
                value,
                data,
                ISafe.Operation.Call
            );
            if (!success) revert ExecutionFailure(to, data, block.timestamp);
        }
    }

    /// @notice Allows executing specific calldata into an address thru a gnosis-safe, which have enable this contract as module.
    /// @param to Contract address where we will execute the calldata.
    /// @param data Calldata to be executed within the boundaries of the `allowedFunctions`.
    /// @return bytes data containing the return data from the method in `to` with the payload `data`
    function _checkTransactionAndExecuteReturningData(
        ISafe safe,
        address to,
        uint256 value,
        bytes memory data
    ) external onlyModuleOwner returns  (bytes memory) {
        if (data.length >= 4) {
            (bool success, bytes memory returnData) = safe
                .execTransactionFromModuleReturnData(
                    to,
                    value,
                    data,
                    ISafe.Operation.Call
                );
            if (!success) revert ExecutionFailure(to, data, block.timestamp);
            return returnData;
        }
    }

    /// @dev Helper function to convert address to string
    function addressToString(
        address _address
    ) internal pure returns (string memory) {
        bytes32 _bytes = bytes32(uint256(uint160(_address)));
        bytes memory HEX = "0123456789abcdef";
        bytes memory _string = new bytes(42);
        _string[0] = "0";
        _string[1] = "x";
        for (uint256 i = 0; i < 20; i++) {
            _string[2 + i * 2] = HEX[uint8(_bytes[i + 12] >> 4)];
            _string[3 + i * 2] = HEX[uint8(_bytes[i + 12] & 0x0f)];
        }
        return string(_string);
    }

    // setters 
    function setPrefferedToken(address _prefferedToken) external {
        prefferedToken[msg.sender] = _prefferedToken;
    }

    function setPrefferedChainId(uint256 _prefferedChainId) external {
        prefferedChainId[msg.sender] = _prefferedChainId;
    }

    function setPrefferedAddress(address _prefferedAddress) external {
        prefferedAddress[msg.sender] = _prefferedAddress;
    }
}
