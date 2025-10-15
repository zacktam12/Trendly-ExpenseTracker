
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

interface ExpenseDashboardProps {
  showExpenseForm?: boolean;
  setShowExpenseForm?: (show: boolean) => void;
}

const ExpenseDashboard: React.FC<ExpenseDashboardProps> = ({ 
  showExpenseForm: externalShowExpenseForm, 
  setShowExpenseForm: externalSetShowExpenseForm 
}) => {
  const { getTotalExpenses, getMonthlyTotal } = useExpense();
  const [internalShowExpenseForm, setInternalShowExpenseForm] = useState(false);
  const { month, year } = getCurrentMonthYear();
  
  const totalExpenses = getTotalExpenses();
  const monthlyTotal = getMonthlyTotal(month, year);
  const monthName = getMonthName(month);

  // Use external state if provided, otherwise use internal
  const showExpenseForm = externalShowExpenseForm !== undefined ? externalShowExpenseForm : internalShowExpenseForm;
  const setShowExpenseForm = externalSetShowExpenseForm || setInternalShowExpenseForm;

  return (
    <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 max-w-7xl transition-colors duration-300 dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div className="w-full sm:w-auto">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Expense Tracker
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground dark:text-gray-300 mt-1">
            Track, analyze, and optimize your spending
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Button 
            onClick={() => setShowExpenseForm(true)} 
            className="flex-1 sm:flex-none bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl h-10 sm:h-9"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            <span className="text-sm sm:text-base">Add Expense</span>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700 border-l-4 border-l-purple-500">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground dark:text-gray-300 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-purple-500" />
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-xl sm:text-2xl font-bold dark:text-white">{formatCurrency(totalExpenses)}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700 border-l-4 border-l-pink-500">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground dark:text-gray-300 flex items-center gap-2">
              <PieChart className="h-4 w-4 text-pink-500" />
              {monthName} Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-xl sm:text-2xl font-bold dark:text-white">{formatCurrency(monthlyTotal)}</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700 border-l-4 border-l-blue-500 sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground dark:text-gray-300 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              Average per Day
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-xl sm:text-2xl font-bold dark:text-white">
              {formatCurrency(monthlyTotal / new Date(year, month + 1, 0).getDate())}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Daily average</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="mb-4 sm:mb-6 w-full grid grid-cols-3 h-auto p-1 bg-muted/50">
          <TabsTrigger 
            value="recent" 
            className="text-xs sm:text-sm py-2 sm:py-2.5 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
          >
            Recent
          </TabsTrigger>
          <TabsTrigger 
            value="charts" 
            className="text-xs sm:text-sm py-2 sm:py-2.5 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
          >
            Charts
          </TabsTrigger>
          <TabsTrigger 
            value="monthly" 
            className="text-xs sm:text-sm py-2 sm:py-2.5 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
          >
            Monthly
          </TabsTrigger>
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
