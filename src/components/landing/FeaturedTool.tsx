const tools = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Perplexity",
  "Cursor",
  "GitHub Copilot",
];

export default function FeaturedTools() {
  return (
    <section className="mx-auto max-w-6xl py-16">
      <h2 className="mb-8 text-center text-4xl font-bold">
        Featured AI Tools
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {tools.map((tool) => (
          <div
            key={tool}
            className="rounded-xl border p-6 transition hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold">{tool}</h3>

            <p className="mt-3 text-gray-500">
              Compare features, pricing and capabilities.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}