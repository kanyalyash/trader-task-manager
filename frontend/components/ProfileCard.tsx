"use client";

export default function ProfileCard() {
  return (
    <div className="bg-white border rounded-xl p-5">
      <h2 className="text-lg font-semibold mb-3">Profile</h2>
      <p className="text-sm text-gray-600">Name: Demo User</p>
      <p className="text-sm text-gray-600">Email: demo@trader.com</p>
      <p className="text-sm text-gray-600">Joined: Jan 2026</p>
    </div>
  );
}
