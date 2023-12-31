import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { SafeAuthUserInfo } from "@safe-global/auth-kit";
import { ConnectButton as RainbowKitConnectButton } from "@rainbow-me/rainbowkit";

const AppBar = () => {
    return (
        <Navbar fluid rounded>
            {/* <NavbarBrand href="https://flowbite-react.com">
                <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Pay Buddy</span>
            </NavbarBrand>
            {isLoggedIn ? (
                <div className="flex md:order-2">
                    <Button onClick={onLogout}>Log Out</Button>
                </div>
            ) : (
                <Button onClick={onLogin}>Login</Button>
            )} */}
            <NavbarCollapse>
                <NavbarLink href="#" active>
                    <RainbowKitConnectButton />
                </NavbarLink>
            </NavbarCollapse>
        </Navbar>
    );
};

export default AppBar;
