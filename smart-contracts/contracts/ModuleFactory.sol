// SPDX-License-Identifier: MIT
import "./interfaces/ISafe.sol";
import "./BaseModule.sol";

pragma solidity >=0.7.0 <0.9.0;

/// @title   ModuleFactory
/// @dev  Allows deploying easily a module targeting a specific safe environment
contract ModuleFactory {
    ////////////////////////////////////////////////////////////////////////////
    // ERRORS
    ////////////////////////////////////////////////////////////////////////////

    error NoSupportedModuleType(ModuleType moduleType, address deployer);

    error NotSigner(address safe, address executor);

    mapping (ISafe => address) public safeToModule;

    ////////////////////////////////////////////////////////////////////////////
    // EVENTS
    ////////////////////////////////////////////////////////////////////////////

    event ModuleDeployed(
        address module,
        ModuleType moduleType,
        address deployer,
        uint256 timestamp
    );

    ////////////////////////////////////////////////////////////////////////////
    // CONSTANTS
    ////////////////////////////////////////////////////////////////////////////

    enum ModuleType {
        REVOKE_MODULE,
        AAVE_WITHDRAW,
        UNISWAP_WITHDRAW
    }

    /// @dev Deploys the pay buddy module
    /// @notice Deploys a new module
    /// @param safe target safe contract which the module is targeting
    function createModuleAndEnable(ISafe safe, address token, string memory chainId, address prefferedAddress ) external returns (address) {
        address module;
        module = address(new BaseModule(safe, token, chainId, prefferedAddress));
        safeToModule[safe] = module;
        return module;
    }
}
