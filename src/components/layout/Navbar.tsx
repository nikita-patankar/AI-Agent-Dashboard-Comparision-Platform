"use client";

import Link from "next/link";

export default function Navbar(){
    return (
        <nav className="border-b">
            <div className="mx-auto flex h-16 max-w-17xl items-center justify-between px-6">
                <Link href="/" className="text-2xl font-bond text-indigo-600">AIKart</Link>
                <div className="flex gap-6">
                    <Link href="/">Home</Link>
                    <Link href="/Dashboard">Dashboard</Link>
                    <Link href="/login">Login</Link>
                    <Link href="register">Register</Link>
                </div>
            </div>
        </nav>
    );
}