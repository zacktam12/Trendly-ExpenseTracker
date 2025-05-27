
import React from 'react';
import { ExpenseProvider } from '@/context/ExpenseContext';
import ExpenseDashboard from '@/components/ExpenseDashboard';

const Index = () => {
  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300">
        <ExpenseDashboard />
      </div>
    </ExpenseProvider>
  );
};

export default Index;
