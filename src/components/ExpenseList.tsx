
import React, { useState, useEffect } from "react";
import { useExpense } from "@/context/ExpenseContext";
import { formatCurrency, formatDate } from "@/utils/dateUtils";
import { Expense } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ChevronLeft, ChevronRight, Receipt } from "lucide-react";
import ExpenseForm from "./ExpenseForm";
import EmptyState from "./EmptyState";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

const ITEMS_PER_PAGE = 7;

const ExpenseList: React.FC = () => {
  const { expenses, deleteExpense, getCategoryById } = useExpense();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Reset to first page if expenses change and current page is out of range
  useEffect(() => {
    if (
      currentPage > 0 &&
      currentPage >= Math.ceil(expenses.length / ITEMS_PER_PAGE)
    ) {
      setCurrentPage(0);
    }
  }, [expenses, currentPage]);

  // Sort expenses by date (newest first)
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const paginatedExpenses = sortedExpenses.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(expenses.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleDelete = (id: string) => {
    deleteExpense(id);
    setDeleteConfirmId(null);
  };

  return (
    <div>
      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Note</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedExpenses.length > 0 ? (
              paginatedExpenses.map((expense) => {
                const category = getCategoryById(expense.category);
                return (
                  <TableRow key={expense.id}>
                    <TableCell>{formatDate(new Date(expense.date))}</TableCell>
                    <TableCell>
                      <Badge
                        style={
                          category?.color
                            ? { backgroundColor: category.color, color: '#fff' }
                            : undefined
                        }
                        className="font-medium shadow-sm"
                      >
                        {category?.name || "Unknown"}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {expense.note || "-"}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(expense.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(expense)}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteConfirmId(expense.id)}
                        className="h-8 w-8 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="p-0">
                  <EmptyState
                    icon={Receipt}
                    title="No Expenses Yet"
                    description="Start tracking your spending by adding your first expense. Click the 'Add Expense' button to get started!"
                    iconColor="text-purple-500"
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View - Shown only on mobile */}
      <div className="md:hidden space-y-3">
        {paginatedExpenses.length > 0 ? (
          paginatedExpenses.map((expense) => {
            const category = getCategoryById(expense.category);
            return (
              <div
                key={expense.id}
                className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <Badge
                      style={
                        category?.color
                          ? { backgroundColor: category.color, color: '#fff' }
                          : undefined
                      }
                      className="font-medium mb-2 shadow-sm"
                    >
                      {category?.name || "Unknown"}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(new Date(expense.date))}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {formatCurrency(expense.amount)}
                    </p>
                  </div>
                </div>
                
                {expense.note && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {expense.note}
                  </p>
                )}
                
                <div className="flex justify-end gap-2 pt-2 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(expense)}
                    className="flex items-center gap-1 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 dark:hover:bg-purple-900/20"
                  >
                    <Pencil className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteConfirmId(expense.id)}
                    className="flex items-center gap-1 text-destructive hover:bg-red-50 hover:text-red-700 hover:border-red-300 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <EmptyState
            icon={Receipt}
            title="No Expenses Yet"
            description="Start tracking your spending by adding your first expense. Click the button above or use the '+' button to get started!"
            iconColor="text-purple-500"
          />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 sm:gap-4 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="h-9 px-3"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Previous</span>
          </Button>
          <span className="text-xs sm:text-sm text-muted-foreground font-medium">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className="h-9 px-3"
          >
            <span className="hidden sm:inline mr-1">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Edit Form Dialog */}
      {editingExpense && (
        <ExpenseForm
          expense={editingExpense}
          handleClose={() => setEditingExpense(null)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteConfirmId}
        onOpenChange={(open) => {
          if (!open) setDeleteConfirmId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              expense.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteConfirmId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExpenseList;
