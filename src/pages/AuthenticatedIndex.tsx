
import React, { useState } from 'react';
import { ExpenseProvider } from '@/context/ExpenseContext';
import ExpenseDashboard from '@/components/ExpenseDashboard';
import ThemeToggle from '@/components/ThemeToggle';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const AuthenticatedIndex = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300 pb-20 md:pb-0">
        <header className="sticky top-0 z-50 w-full px-3 py-3 sm:px-4 sm:py-4 border-b border-border bg-background/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center min-w-0 flex-1">
              <img 
                src="/logo.png" 
                alt="Trendly Logo" 
                className="h-7 w-7 sm:h-8 sm:w-8 object-contain mr-2"
              />
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
                Trendly
              </h1>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden sm:flex items-center gap-1.5 sm:gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 h-9 px-2 sm:px-3"
                onClick={() => navigate('/profile')}
              >
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8 cursor-pointer transition-all hover:scale-105 ring-2 ring-purple-200 dark:ring-purple-800">
                  {user?.profileImage && user.profileImage !== '/placeholder.svg' ? (
                    <AvatarImage src={user.profileImage} alt={user.name} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700 dark:from-purple-900 dark:to-pink-900 dark:text-purple-200 text-xs font-semibold">
                      {user?.name ? getInitials(user.name) : <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="hidden md:inline text-sm font-medium max-w-[100px] truncate">{user?.name || 'User'}</span>
              </Button>
              <ThemeToggle />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-1.5 transition-all duration-300 hover:bg-red-50 hover:text-red-600 hover:border-red-300 dark:hover:bg-red-900/20 dark:hover:text-red-400 h-9 px-2 sm:px-3"
              >
                <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline text-xs sm:text-sm">Logout</span>
              </Button>
            </div>
          </div>
        </header>
        <ExpenseDashboard showExpenseForm={showExpenseForm} setShowExpenseForm={setShowExpenseForm} />
        <MobileBottomNav onAddExpense={() => setShowExpenseForm(true)} />
      </div>
    </ExpenseProvider>
  );
};

export default AuthenticatedIndex;
