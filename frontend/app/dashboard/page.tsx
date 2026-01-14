"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import ProfileCard from "../../components/ProfileCard";
import TasksSection from "../../components/TasksSection";

export default function DashboardPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [checkingAuth, setCheckingAuth] = useState(true);

  // ✅ Dashboard Stats (Dynamic)
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  // ✅ Protect Dashboard + Load Stats
  useEffect(() => {
    const checkAuthAndLoad = async () => {
      try {
        // ✅ Check if user logged in
        await api.get("/auth/me");

        // ✅ Load tasks stats from DB
        const res = await api.get("/tasks");
        const tasks = res.data;

        const total = tasks.length;
        const completed = tasks.filter((t: any) => t.status === "Completed").length;
        const pending = tasks.filter((t: any) => t.status === "Pending").length;

        setStats({ total, completed, pending });
        setCheckingAuth(false);
      } catch (err) {
        router.push("/login");
      }
    };

    checkAuthAndLoad();
  }, [router]);

  // ✅ Loading screen while checking auth
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-semibold text-gray-700">Checking login...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1">
        <Topbar />

        <main className="p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* ✅ Dynamic Dashboard Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Tasks</p>
                      <p className="text-3xl font-bold text-gray-800 mt-1">{stats.total}</p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📋</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Completed</p>
                      <p className="text-3xl font-bold text-green-600 mt-1">{stats.completed}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">✓</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Pending</p>
                      <p className="text-3xl font-bold text-orange-600 mt-1">{stats.pending}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">⏳</span>
                    </div>
                  </div>
                </div>
              </div>

              <ProfileCard />
              <TasksSection />
            </div>
          )}

          {activeTab === "tasks" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">All Tasks</h2>
              <TasksSection />
            </div>
          )}

          {activeTab === "profile" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
              <ProfileCard />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
