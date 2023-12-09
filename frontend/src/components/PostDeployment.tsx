import React from "react";

type Props = {
    safeAddress: string;
};

const PreDeployment = ({ safeAddress }: Props) => {
    return (
        <section className="bg-white dark:bg-gray-900 h-full">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-8 text-3xl tracking-tight font-bold md:text-4xl text-primary-600 dark:text-primary-500">Welcome!</h1>
                </div>
            </div>
        </section>
    );
};

export default PreDeployment;
