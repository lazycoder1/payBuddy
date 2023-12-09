"use client";
import dynamic from "next/dynamic";

const Home1 = dynamic(() => import("./page1"), {
    ssr: false,
});

export default function Home() {
    return <Home1 />;
}
