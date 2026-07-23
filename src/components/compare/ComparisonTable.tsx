"use client";

interface Tool {
  _id: string;
  name: string;
  company: string;
  category: string;
  pricing: string;
  rating: number;
  apiAvailable: boolean;
  website: string;
}

interface Props {
  tools: Tool[];
}

export default function ComparisonTable({ tools }: Props) {

  if (tools.length < 2) return null;

  const highestRating = Math.max(...tools.map((t) => t.rating));

  return (
    <div className="mb-10 overflow-x-auto rounded-xl border shadow">

      <h2 className="text-2xl font-bold p-5 border-b">
        Comparison Table
      </h2>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="border p-4 text-left">
              Feature
            </th>

            {tools.map((tool) => (
              <th
                key={tool._id}
                className="border p-4"
              >
                {tool.name}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          <tr>

            <td className="border p-3 font-semibold">
              Company
            </td>

            {tools.map((tool) => (
              <td
                key={tool._id}
                className="border p-3"
              >
                {tool.company}
              </td>
            ))}

          </tr>

          <tr>

            <td className="border p-3 font-semibold">
              Category
            </td>

            {tools.map((tool) => (
              <td
                key={tool._id}
                className="border p-3"
              >
                {tool.category}
              </td>
            ))}

          </tr>

          <tr>

            <td className="border p-3 font-semibold">
              Pricing
            </td>

            {tools.map((tool) => (
              <td
                key={tool._id}
                className="border p-3"
              >
                {tool.pricing}
              </td>
            ))}

          </tr>

          <tr>

            <td className="border p-3 font-semibold">
              Rating
            </td>

            {tools.map((tool) => (
              <td
                key={tool._id}
                className={`border p-3 font-bold ${tool.rating === highestRating
                    ? "text-green-600"
                    : ""
                  }`}
              >
                ⭐ {tool.rating}
              </td>
            ))}

          </tr>

          <tr>

            <td className="border p-3 font-semibold">
              API Available
            </td>

            {tools.map((tool) => (
              <td
                key={tool._id}
                className="border p-3"
              >
                {tool.apiAvailable ? "✅ Yes" : "❌ No"}
              </td>
            ))}

          </tr>

          <tr>
            <td className="border p-3 font-semibold">
              Website
            </td>

            {tools.map((tool) => (
              <td
                key={tool._id}
                className="border p-3 text-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {new URL(tool.website).hostname.replace("www.", "")}
                  </span>

                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                  >
                    Visit ↗
                  </a>
                </div>
              </td>
            ))}
          </tr>

        </tbody>

      </table>

    </div>
  );
}