import Link from "next/link";
import {
  Bot,
  GitCompare,
  Bookmark,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";

export default function LearnMorePage() {
  return (
    <div className="bg-slate-50">

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">

        <h1 className="text-5xl font-bold text-gray-900">
          AI Agent Comparison Dashboard
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
          Discover, compare and manage the latest AI tools in one place.
          Whether you&apos;re a developer, student, researcher or content creator,
          our platform helps you find the perfect AI solution for your workflow.
        </p>

        <Link
          href="/dashboard"
          className="mt-10 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
        >
          Explore Dashboard
          <ArrowRight size={18} />
        </Link>

      </section>

      {/* Features */}

      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-20 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl bg-white p-8 shadow">

          <Bot
            className="mb-4 text-indigo-600"
            size={42}
          />

          <h2 className="mb-3 text-xl font-bold">
            Explore AI Tools
          </h2>

          <p className="text-gray-600">
            Browse hundreds of AI tools across multiple categories
            including chatbots, coding assistants, image generation,
            productivity and research.
          </p>

        </div>

        <div className="rounded-2xl bg-white p-8 shadow">

          <GitCompare
            className="mb-4 text-green-600"
            size={42}
          />

          <h2 className="mb-3 text-xl font-bold">
            Compare Tools
          </h2>

          <p className="text-gray-600">
            Compare multiple AI tools side-by-side based on pricing,
            features, APIs, ratings and categories.
          </p>

        </div>

        <div className="rounded-2xl bg-white p-8 shadow">

          <Bookmark
            className="mb-4 text-pink-600"
            size={42}
          />

          <h2 className="mb-3 text-xl font-bold">
            Save Favorites
          </h2>

          <p className="text-gray-600">
            Bookmark your favorite AI tools and quickly access them
            whenever you need them.
          </p>

        </div>

        <div className="rounded-2xl bg-white p-8 shadow">

          <LayoutDashboard
            className="mb-4 text-orange-500"
            size={42}
          />

          <h2 className="mb-3 text-xl font-bold">
            Manage Your Tools
          </h2>

          <p className="text-gray-600">
            Create your own AI tool listings and manage them
            through the My Tools dashboard.
          </p>

        </div>

      </section>

      {/* About */}

      <section className="bg-white py-20">

        <div className="mx-auto max-w-4xl px-6 text-center">

          <h2 className="text-4xl font-bold">
            Why This Platform?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            The AI ecosystem is growing rapidly with new tools launching
            every week. Choosing the right AI assistant can be confusing.
            Our platform simplifies the process by collecting AI tools in
            one place, allowing users to compare features, pricing,
            availability and ratings before making a decision.
          </p>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-indigo-600 py-20 text-center text-white">

        <h2 className="text-4xl font-bold">
          Ready to Explore AI?
        </h2>

        <p className="mt-4 text-lg text-indigo-100">
          Start comparing AI tools and discover the best solution
          for your workflow.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-indigo-600 transition hover:bg-gray-100"
        >
          Go to Dashboard
        </Link>

      </section>

    </div>
  );
}