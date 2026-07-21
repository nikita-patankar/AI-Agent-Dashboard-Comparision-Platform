import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <h1 className="text-5xl font-bold text-indigo-600">
        AI Agent Comparison Dashboard
      </h1>

      <p className="mt-4 text-gray-600 text-lg">
        Compare AI tools smarter and faster.
      </p>

      <button className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700">
        Get Started
      </button>
    </main>
  );
}