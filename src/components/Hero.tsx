export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold">
        Compare AI Agents
        <span className="text-indigo-600">
          {" "}Smarter
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-gray-600">
        Discover, compare, bookmark and manage the best AI tools
        for your workflow.
      </p>

      <div className="mt-8 flex gap-4">
        <button className="rounded-lg bg-indigo-600 px-6 py-3 text-white">
          Explore
        </button>

        <button className="rounded-lg border px-6 py-3">
          Learn More
        </button>
      </div>
    </section>
  );
}