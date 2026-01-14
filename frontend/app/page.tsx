import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-black text-red-600">Trader UI</h1>


      <div className="flex gap-3">
        <Link
          href="/login"
          className="px-4 py-2 rounded-lg bg-black text-white"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="px-4 py-2 rounded-lg border"
        >
          Register
        </Link>

        <Link
          href="/dashboard"
          className="px-4 py-2 rounded-lg border"
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}
