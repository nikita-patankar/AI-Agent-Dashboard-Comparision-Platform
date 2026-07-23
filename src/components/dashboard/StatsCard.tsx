interface StatsCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  bgColor = "bg-blue-600",
  textColor = "text-white",
}: StatsCardProps) {
  return (
    <div
      className={`rounded-2xl ${bgColor} ${textColor} p-6 shadow-lg transition duration-300 hover:scale-105`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>

          <h2 className="mt-2 text-4xl font-bold">
            {value}
          </h2>
        </div>

        {icon && (
          <div className="rounded-full bg-white/20 p-3">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}