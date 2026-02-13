import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
  colorClass?: string;
  trend?: string;
}

export const ResumeCard = ({
  title,
  value,
  colorClass,
  icon,
  trend,
}: Props) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-4 ${colorClass}`}
      >
        <div className="shrink-0">{icon}</div>
        <h3
          className={`${colorClass} text-sm font-bold uppercase tracking-wide opacity-90`}
        >
          {title}
        </h3>
      </div>

      <div className="flex items-end justify-between px-1">
        <p className="text-4xl font-extrabold text-gray-900 tracking-tight">
          {value}
        </p>

        {trend && (
          <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full border border-green-200">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};
