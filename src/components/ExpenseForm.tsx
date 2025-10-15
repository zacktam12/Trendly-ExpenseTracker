
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Expense } from '@/types';
import { useExpense } from '@/context/ExpenseContext';
import { v4 as uuidv4 } from 'uuid';
import { Plus } from 'lucide-react';

interface ExpenseFormProps {
  expense?: Expense;
  onSubmit?: (expense: Expense) => void;
  onCancel?: () => void;
  handleClose?: () => void;
}

const expenseSchema = z.object({
  amount: z.coerce.number().positive('Amount must be positive'),
  category: z.string().min(1, 'Category is required'),
  date: z.date(),
  note: z.string().optional(),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, onSubmit, onCancel, handleClose }) => {
  const { addExpense, updateExpense, categories, addCategory } = useExpense();
  const [selectedDate, setSelectedDate] = useState<string>(
    expense?.date ? new Date(expense.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  );
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: expense?.amount || 0,
      category: expense?.category || '',
      date: expense?.date || new Date(),
      note: expense?.note || '',
    },
  });

  const handleSubmit = (values: ExpenseFormValues) => {
    const newExpense: Expense = {
      id: expense?.id || uuidv4(),
      amount: values.amount,
      category: values.category,
      date: values.date,
      note: values.note,
    };

    if (expense) {
      updateExpense(newExpense);
    } else {
      addExpense(newExpense);
    }

    if (onSubmit) {
      onSubmit(newExpense);
    }

    // Close the dialog
    if (handleClose) {
      handleClose();
    } else if (onCancel) {
      onCancel();
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    form.setValue('date', new Date(e.target.value));
  };

  const handleCancel = () => {
    if (handleClose) {
      handleClose();
    } else if (onCancel) {
      onCancel();
    }
  };

  const handleAddNewCategory = () => {
    if (newCategoryName.trim()) {
      addCategory({
        name: newCategoryName.trim(),
        color: '#E5DEFF',
        icon: 'tag'
      });
      form.setValue('category', categories.length.toString());
      setNewCategoryName('');
      setShowNewCategory(false);
    }
  };

  const renderCategorySelect = () => (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-semibold">Category</FormLabel>
          <div className="space-y-3">
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="h-11 sm:h-12 text-base focus:ring-2 focus:ring-purple-500 transition-all">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id} className="py-3 text-base cursor-pointer">
                    {category.name}
                  </SelectItem>
                ))}
                <SelectItem value="__add_new__" className="text-purple-600 font-medium py-3 text-base cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add new category
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {field.value === '__add_new__' && (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddNewCategory()}
                  className="h-11 text-base focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <Button 
                  type="button" 
                  size="sm" 
                  onClick={handleAddNewCategory}
                  className="h-11 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Add
                </Button>
              </div>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  // If handleClose is provided, render as a dialog
  if (handleClose) {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/logo.png" 
                alt="Trendly Logo" 
                className="h-8 w-8 object-contain"
              />
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">
              {expense ? 'Edit Expense' : 'Add New Expense'}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 sm:space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Amount</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        placeholder="0.00" 
                        {...field} 
                        className="h-11 sm:h-12 text-base focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {renderCategorySelect()}

              <FormItem>
                <FormLabel className="text-sm font-semibold">Date</FormLabel>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="h-11 sm:h-12 text-base focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </FormItem>

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Note (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add details about this expense..." 
                        {...field} 
                        className="min-h-[100px] sm:min-h-[120px] text-base resize-none focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleCancel}
                  className="h-11 sm:h-10 text-base sm:text-sm font-medium"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="h-11 sm:h-10 text-base sm:text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {expense ? 'Update' : 'Add'} Expense
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }

  // Original form without dialog wrapper
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {renderCategorySelect()}

        <FormItem>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </FormItem>

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Add details about this expense..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">{expense ? 'Update' : 'Add'} Expense</Button>
        </div>
      </form>
    </Form>
  );
};

export default ExpenseForm;
