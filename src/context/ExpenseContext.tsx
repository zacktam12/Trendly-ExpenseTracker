import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Expense, Category } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

interface ExpenseContextType {
  expenses: Expense[];
  categories: Category[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  editExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  addCategory: (category: Omit<Category, "id">) => void;
  deleteCategory: (id: string) => void;
  getCategoryById: (id: string) => Category | undefined;
  getTotalExpenses: () => number;
  getMonthlyTotal: (month: number, year: number) => number;
  updateExpense: (expense: Expense) => void;
}

// Initial categories
const initialCategories: Category[] = [
  { id: "1", name: "Food", color: "#F2FCE2", icon: "utensils" },
  { id: "2", name: "Transportation", color: "#D3E4FD", icon: "car" },
  { id: "3", name: "Entertainment", color: "#FFDEE2", icon: "film" },
  { id: "4", name: "Bills", color: "#FEF7CD", icon: "file-invoice-dollar" },
  { id: "5", name: "Shopping", color: "#FEC6A1", icon: "shopping-bag" },
  { id: "6", name: "Health", color: "#E5DEFF", icon: "heartbeat" },
  { id: "7", name: "Other", color: "#C8C8C9", icon: "ellipsis-h" },
];

// Sample expenses for demo
const sampleExpenses: Expense[] = [
  {
    id: uuidv4(),
    amount: 25.5,
    category: "1",
    date: new Date(2025, 4, 1),
    note: "Grocery shopping",
  },
  {
    id: uuidv4(),
    amount: 35.0,
    category: "2",
    date: new Date(2025, 4, 2),
    note: "Uber ride",
  },
  {
    id: uuidv4(),
    amount: 15.99,
    category: "3",
    date: new Date(2025, 4, 3),
    note: "Movie ticket",
  },
  {
    id: uuidv4(),
    amount: 120.0,
    category: "4",
    date: new Date(2025, 4, 4),
    note: "Electricity bill",
  },
  {
    id: uuidv4(),
    amount: 67.89,
    category: "5",
    date: new Date(2025, 4, 5),
    note: "New t-shirt",
  },
];

const ExpenseContext = createContext<ExpenseContextType | null>(null);

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
};

interface ExpenseProviderProps {
  children: ReactNode;
}

export const ExpenseProvider = ({ children }: ExpenseProviderProps) => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      try {
        return JSON.parse(savedExpenses, (key, value) => {
          if (key === "date") return new Date(value);
          return value;
        });
      } catch (e) {
        console.error("Failed to parse expenses from localStorage:", e);
        return sampleExpenses;
      }
    }
    return sampleExpenses;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      try {
        return JSON.parse(savedCategories);
      } catch (e) {
        console.error("Failed to parse categories from localStorage:", e);
        return initialCategories;
      }
    }
    return initialCategories;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addExpense = (expenseData: Omit<Expense, "id">) => {
    try {
      // Validate amount
      if (typeof expenseData.amount !== "number" || expenseData.amount <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }

      // Validate date
      const date =
        expenseData.date instanceof Date
          ? expenseData.date
          : new Date(expenseData.date);

      if (isNaN(date.getTime())) {
        toast.error("Please select a valid date");
        return;
      }

      // Validate category
      if (!categories.some((cat) => cat.id === expenseData.category)) {
        toast.error("Please select a valid category");
        return;
      }

      const newExpense: Expense = {
        ...expenseData,
        id: uuidv4(),
        date: date,
      };

      setExpenses((prev) => [...prev, newExpense]);
      toast.success("Expense added successfully");
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense");
    }
  };

  const editExpense = (updatedExpense: Expense) => {
    try {
      // Validate the expense before updating
      if (!categories.some((cat) => cat.id === updatedExpense.category)) {
        toast.error("Invalid category");
        return;
      }

      setExpenses((prev) =>
        prev.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
      );
      toast.success("Expense updated successfully");
    } catch (error) {
      console.error("Error updating expense:", error);
      toast.error("Failed to update expense");
    }
  };

  const updateExpense = (expense: Expense) => {
    editExpense(expense); // Alias for editExpense
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    toast.success("Expense deleted successfully");
  };

  const addCategory = (categoryData: Omit<Category, "id">) => {
    try {
      if (!categoryData.name.trim()) {
        toast.error("Category name cannot be empty");
        return;
      }

      if (
        categories.some(
          (cat) => cat.name.toLowerCase() === categoryData.name.toLowerCase()
        )
      ) {
        toast.error("Category already exists");
        return;
      }

      const newCategory = {
        ...categoryData,
        id: uuidv4(),
        name: categoryData.name.trim(),
      };

      setCategories((prev) => [...prev, newCategory]);
      toast.success("Category added successfully");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
    }
  };

  const deleteCategory = (id: string) => {
    try {
      const hasExpenses = expenses.some((exp) => exp.category === id);

      if (hasExpenses) {
        toast.error("Can't delete category with existing expenses");
        return;
      }

      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  const getCategoryById = (id: string) => {
    return categories.find((cat) => cat.id === id);
  };

  const getTotalExpenses = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getMonthlyTotal = (month: number, year: number) => {
    return expenses
      .filter(
        (exp) =>
          exp.date.getMonth() === month && exp.date.getFullYear() === year
      )
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const value = {
    expenses,
    categories,
    addExpense,
    editExpense,
    deleteExpense,
    addCategory,
    deleteCategory,
    getCategoryById,
    getTotalExpenses,
    getMonthlyTotal,
    updateExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};
