"use client";

import Link from "next/link";
import Button1 from "@/app/components/button/button1";

export default function Dashboard() {
    return (
        <div className="min-h-screen flex flex-col gap-8">
            <h1 className="text-4xl font-bold text-center">Dashboard</h1>
            <p className="text-lg text-center">
                👋 Hello and welcome! </p>
        </div>
    );
}
