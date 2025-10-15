
import React, { useMemo, useState } from 'react';
import { useExpense } from '@/context/ExpenseContext';
import { formatCurrency } from '@/utils/dateUtils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ExpensesByCategory } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import EmptyState from './EmptyState';
import { PieChartIcon } from 'lucide-react';

const ExpenseChart = () => {
  const { expenses, categories } = useExpense();
  const [timeFilter, setTimeFilter] = useState<string>('all');

  const filteredExpenses = useMemo(() => {
    if (timeFilter === 'all') {
      return expenses;
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    if (timeFilter === 'month') {
      return expenses.filter(
        expense => 
          expense.date.getMonth() === currentMonth && 
          expense.date.getFullYear() === currentYear
      );
    }

    if (timeFilter === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      return expenses.filter(
        expense => new Date(expense.date) >= oneWeekAgo
      );
    }

    return expenses;
  }, [expenses, timeFilter]);

  const expensesByCategory = useMemo(() => {
    const result: ExpensesByCategory[] = [];
    
    filteredExpenses.forEach(expense => {
      const category = categories.find(cat => cat.id === expense.category);
      if (!category) return;

      const existingCategory = result.find(item => item.category === category.name);
      if (existingCategory) {
        existingCategory.total += expense.amount;
      } else {
        result.push({
          category: category.name,
          total: expense.amount,
          color: category.color
        });
      }
    });

    // Sort by total amount (highest first)
    return result.sort((a, b) => b.total - a.total);
  }, [filteredExpenses, categories]);

  const totalAmount = useMemo(() => {
    return expensesByCategory.reduce((sum, item) => sum + item.total, 0);
  }, [expensesByCategory]);

  if (expensesByCategory.length === 0) {
    return (
      <EmptyState
        icon={PieChartIcon}
        title="No Data to Display"
        description="Add some expenses to see your spending breakdown and visualize where your money goes."
        iconColor="text-blue-500"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expensesByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="total"
                nameKey="category"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {expensesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Expenses Breakdown */}
        <div>
          <h3 className="text-lg font-medium mb-4">Spending by Category</h3>
          <div className="space-y-2">
            {expensesByCategory.map((item) => (
              <Card key={item.category}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.category}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-medium">{formatCurrency(item.total)}</span>
                      <span className="text-xs text-muted-foreground">
                        {((item.total / totalAmount) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
