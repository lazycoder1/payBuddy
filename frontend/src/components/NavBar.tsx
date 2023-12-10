import { SafeAuthUserInfo, SafeAuthPack } from "@safe-global/auth-kit";
import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { ThemeProvider } from "next-themes";

type Props = {
    name?: string | null;
    login: () => void;
    logout: () => void;
    userInfo?: SafeAuthUserInfo | undefined;
    isLoggedIn: boolean;
    safeAuthPack: SafeAuthPack | null;
};

const NavBar = ({ name, login, logout, isLoggedIn, safeAuthPack }: Props) => {
    const [uInfo, setUInfo] = useState<SafeAuthUserInfo | undefined>(undefined);

    useEffect(() => {
        const setInfo = async () => {
            const userInfo = await safeAuthPack?.getUserInfo();
            console.log("userinfoooo", userInfo);
            setUInfo(userInfo);
        };
    }, [safeAuthPack]);

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PayBuddy</span>
                    </a>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        {isLoggedIn ? (
                            <>
                                <a className="text-sm  text-gray-500 dark:text-white hover:underline">
                                    Hello , {uInfo != undefined ? uInfo.name || uInfo.email : "anon"} !
                                </a>
                                <Button color="light" onClick={logout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Button onClick={login}>Login</Button>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
