import { CHAIN_NAME } from "@/constants/constants";
import React from "react";

type Props = {
    safeAddress: string;
};

const PreDeployment = ({ safeAddress }: Props) => {
    return (
        <section className="bg-white dark:bg-gray-900 h-full">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-8 text-3xl tracking-tight font-bold md:text-4xl text-primary-600 dark:text-primary-500">Nice!</h1>
                    <>
                        <>
                            <p className="mb-8 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                                Safe deployed to network {CHAIN_NAME}.{" "}
                            </p>
                            <p className="mb-8 text-lg font-light text-gray-500 dark:text-gray-400">Safe Address : {safeAddress} : </p>
                            <a
                                href={`https://app.safe.global/settings/modules?safe=arb1:${safeAddress}`}
                                target="_blank"
                                className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
                            >
                                Safe dashbaard
                            </a>
                            <p className="mb-8 text-lg font-light text-red-200 dark:text-red-200">
                                Note: Currently all funds will be swaped to USDC and deposited in your safe{" "}
                            </p>
                        </>
                    </>
                </div>
            </div>
        </section>
    );
};

export default PreDeployment;
