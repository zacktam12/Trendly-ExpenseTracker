
export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: Date;
  note?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface ExpensesByCategory {
  category: string;
  total: number;
  color: string;
}

export interface MonthlyExpenseSummary {
  month: string;
  total: number;
}
