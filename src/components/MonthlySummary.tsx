import React from "react";
import { useExpense } from "@/context/ExpenseContext";
import { getLastSixMonths, formatCurrency } from "@/utils/dateUtils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import EmptyState from "./EmptyState";
import { TrendingUp } from "lucide-react";

const MonthlySummary: React.FC = () => {
  const { getMonthlyTotal } = useExpense();

  // Get last 6 months and prepare chart data
  const data = React.useMemo(
    () =>
      getLastSixMonths().map(({ month, year, label }) => ({
        name: label,
        total: getMonthlyTotal(month, year),
      })),
    [getMonthlyTotal]
  );

  const hasData = data.some((item) => item.total > 0);

  if (!hasData) {
    return (
      <EmptyState
        icon={TrendingUp}
        title="No Monthly Data"
        description="Track your expenses over time to see monthly spending trends and patterns."
        iconColor="text-green-500"
      />
    );
  }

  return (
    <div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => `Monthly Total: ${label}`}
            />
            <Bar dataKey="total" fill="#9b87f5" radius={[4, 4, 0, 0]}>
              <LabelList
                dataKey="total"
                position="top"
                formatter={(value: number) => formatCurrency(value)}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Monthly Spending Summary</h3>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-2">Month</th>
              <th className="pb-2 text-right">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ name, total }) => (
              <tr key={name} className="border-b">
                <td className="py-3">{name}</td>
                <td className="py-3 text-right font-medium">
                  {formatCurrency(total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlySummary;
