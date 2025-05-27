
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, BarChart3, PieChart } from "lucide-react";
import { useExpense } from '@/context/ExpenseContext';
import { formatCurrency, getCurrentMonthYear, getMonthName } from '@/utils/dateUtils';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';
import ExpenseChart from './ExpenseChart';
import MonthlySummary from './MonthlySummary';
import ThemeToggle from './ThemeToggle';

const ExpenseDashboard = () => {
  const { getTotalExpenses, getMonthlyTotal } = useExpense();
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const { month, year } = getCurrentMonthYear();
  
  const totalExpenses = getTotalExpenses();
  const monthlyTotal = getMonthlyTotal(month, year);
  const monthName = getMonthName(month);

  return (
    <div className="container mx-auto p-4 max-w-6xl transition-colors duration-300 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-trendly-text dark:text-white">Trendly Expense Tracker</h1>
          <p className="text-muted-foreground dark:text-gray-300">Track, analyze, and optimize your spending</p>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <ThemeToggle />
          <Button 
            onClick={() => setShowExpenseForm(true)} 
            className="bg-trendly-purple hover:bg-trendly-purple-dark hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-300">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{formatCurrency(totalExpenses)}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-300">{monthName} Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{formatCurrency(monthlyTotal)}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-300">Average per Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">
              {formatCurrency(monthlyTotal / new Date(year, month + 1, 0).getDate())}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="mb-4 mx-auto w-full max-w-md flex justify-center">
          <TabsTrigger value="recent" className="flex-1 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700">Recent Expenses</TabsTrigger>
          <TabsTrigger value="charts" className="flex-1 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700">Charts</TabsTrigger>
          <TabsTrigger value="monthly" className="flex-1 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700">Monthly</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="charts">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseChart />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Monthly Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <MonthlySummary />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Expense Form Dialog */}
      {showExpenseForm && (
        <ExpenseForm handleClose={() => setShowExpenseForm(false)} />
      )}
    </div>
  );
};

export default ExpenseDashboard;
