
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
          <FormLabel>Category</FormLabel>
          <div className="space-y-2">
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
                <SelectItem value="__add_new__" className="text-blue-600 font-medium">
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
                />
                <Button type="button" size="sm" onClick={handleAddNewCategory}>
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{expense ? 'Edit Expense' : 'Add New Expense'}</DialogTitle>
          </DialogHeader>
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
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">{expense ? 'Update' : 'Add'} Expense</Button>
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
