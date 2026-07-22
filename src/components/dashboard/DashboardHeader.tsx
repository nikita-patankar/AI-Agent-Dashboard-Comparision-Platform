"use client";

import Link from "next/link";

export default function DashboardHeader() {
    return (
        <header className="flex items-center justify-between border-b bg-white px-8 py-4">
            <h1 className="text-3xl font-bold">AI Agent Dashboard</h1>
            <Link href="/dashboard/add-tool" className="rounded-lg bg-indigo-600 px-5 py-2 text-white">+ Add Tool</Link>
        </header>
    )
}