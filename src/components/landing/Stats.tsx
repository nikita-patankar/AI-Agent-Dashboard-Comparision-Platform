export default function Stats() {
  const stats = [
    { title: "AI Tools", value: "500+" },
    { title: "Categories", value: "25+" },
    { title: "Users", value: "5K+" },
    { title: "Comparisons", value: "15K+" },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border bg-white p-6 text-center shadow-sm"
          >
            <h2 className="text-3xl font-bold text-indigo-600">
              {item.value}
            </h2>
            <p className="mt-2 text-gray-500">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}