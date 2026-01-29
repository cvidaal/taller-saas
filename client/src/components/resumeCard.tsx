interface Props {
  title: string;
  value: string | number;
}

export const ResumeCard = ({ title, value }: Props) => {
  return (
    <div className="bg-white p-6 w-64 rounded-lg shadow-md mr-2">
      <h1 className="text-gray-700 text-sm font-medium">{title}</h1>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
};
