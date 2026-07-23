"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  LayoutDashboard,
  PlusCircle,
  Bot,
  FolderOpen,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Add Tool",
    href: "/dashboard/add-tool",
    icon: PlusCircle,
  },
  {
    title: "My Tools",
    href: "/dashboard/my-tools",
    icon: FolderOpen,
  },
  {
    title: "Compare Tools",
    href: "/compare",
    icon: Bot,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();

    window.addEventListener("authChanged", checkAuth);

    return () => {
      window.removeEventListener("authChanged", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    window.dispatchEvent(new Event("authChanged"));

    router.replace("/");
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white shadow-md">

      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-blue-600">
          AI Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          AI Agent Comparison
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <Icon size={20} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {isLoggedIn && (
        <div className="border-t p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}