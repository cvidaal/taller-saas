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
    <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 min-w-0">
      <div
        className={`flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl mb-3 sm:mb-4 ${colorClass}`}
      >
        <div className="shrink-0 [&_svg]:w-5 [&_svg]:h-5 sm:[&_svg]:w-6 sm:[&_svg]:h-6">
          {icon}
        </div>
        <h3
          className={`${colorClass} text-xs sm:text-sm font-bold uppercase tracking-wide opacity-90 truncate min-w-0`}
        >
          {title}
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 px-0.5 sm:px-1 min-w-0">
        <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight break-words min-w-0">
          {value}
        </p>

        {trend && (
          <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full border border-green-200 w-fit shrink-0">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};
