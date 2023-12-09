import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { SafeAuthUserInfo } from "@safe-global/auth-kit";
import { ConnectButton as RainbowKitConnectButton } from "@rainbow-me/rainbowkit";

type AppBarProps = {
    isLoggedIn: boolean;
    onLogin: () => void;
    onLogout: () => void;
    userInfo?: SafeAuthUserInfo;
};

const AppBar = ({ isLoggedIn, onLogin, onLogout, userInfo }: AppBarProps) => {
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
