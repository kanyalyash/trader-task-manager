"use client";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between bg-white border-b px-6 py-4">
      <h1 className="text-lg font-semibold">Welcome 👋</h1>

      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gray-300" />
        <div className="text-sm">
          <p className="font-medium">User</p>
          <p className="text-gray-500">user@example.com</p>
        </div>
      </div>
    </header>
  );
}
