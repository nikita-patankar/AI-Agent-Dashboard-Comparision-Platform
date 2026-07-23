"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const checkUser = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse user:", error);
          localStorage.removeItem("user");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Initial check
    checkUser();

    // Listen for login/logout
    window.addEventListener("authChanged", checkUser);

    return () => {
      window.removeEventListener("authChanged", checkUser);
    };
  }, []);


  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-600"
        >
        </Link>

        <div className="flex items-center gap-4">
          {!isMounted ? null : user ? (
            <>
              <span className="font-medium text-gray-700">
                Welcome,{" "}
                <span className="text-indigo-600">
                  {user.name}
                </span>
              </span>

            </>
          ) : (
            <Link
              href="/login"
              className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}