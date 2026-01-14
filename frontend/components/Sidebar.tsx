"use client";

import { useRouter } from "next/navigation";
import api from "../lib/api";

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout"); // ✅ clears cookie in backend
    } catch (err) {
      // even if logout fails, force user to login
      console.log("Logout error");
    } finally {
      router.push("/login");
    }
  };

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Trader UI</h1>

      <nav className="space-y-2">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`w-full text-left px-4 py-3 rounded-lg font-medium ${
            activeTab === "dashboard"
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab("tasks")}
          className={`w-full text-left px-4 py-3 rounded-lg font-medium ${
            activeTab === "tasks"
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Tasks
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`w-full text-left px-4 py-3 rounded-lg font-medium ${
            activeTab === "profile"
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Profile
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
