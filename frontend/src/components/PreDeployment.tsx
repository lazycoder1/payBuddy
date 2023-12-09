import React from "react";

type Props = {
    login: () => void;
    isLoggedIn: boolean;
    eoa: string | null;
    deployModule: any;
    setDeployedSafe: (safeAddress: string) => void;
};

const PreDeployment = ({ isLoggedIn, login, eoa, deployModule, setDeployedSafe }: Props) => {
    const deploySafe = async (eoa: string) => {
        const [safeAddress, safeTxHash] = await deployModule(eoa);
        setDeployedSafe(safeAddress);
    };

    return (
        <section className="bg-white dark:bg-gray-900 h-full">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-8 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                        Welcome!
                    </h1>
                    {isLoggedIn ? (
                        <>
                            <>
                                <p className="mb-8 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                                    Deploy your account in Arbitrum !
                                </p>
                                <p className="mb-8 text-lg font-light text-gray-500 dark:text-gray-400"> </p>
                                <a
                                    onClick={() => deployModule(eoa ? eoa : "0x00")}
                                    className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
                                >
                                    Deploy
                                </a>
                            </>
                        </>
                    ) : (
                        <>
                            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                                Let&apos;s get you started !
                            </p>
                            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400"> </p>
                            <a
                                onClick={login}
                                className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
                            >
                                Login
                            </a>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PreDeployment;
