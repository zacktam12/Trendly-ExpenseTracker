
import React from 'react';
import { ExpenseProvider } from '@/context/ExpenseContext';
import ExpenseDashboard from '@/components/ExpenseDashboard';
import ThemeToggle from '@/components/ThemeToggle';
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
      <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300">
        <header className="sticky top-0 z-50 w-full p-4 border-b border-border bg-background/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400 mr-4">
                Trendly
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => navigate('/profile')}
              >
                <Avatar className="h-8 w-8 cursor-pointer transition-all hover:scale-105">
                  {user?.profileImage && user.profileImage !== '/placeholder.svg' ? (
                    <AvatarImage src={user.profileImage} alt={user.name} />
                  ) : (
                    <AvatarFallback className="bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200">
                      {user?.name ? getInitials(user.name) : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium">{user?.name || 'User'}</span>
              </Button>
              <ThemeToggle />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center gap-2 transition-all duration-300 hover:bg-red-100 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </header>
        <ExpenseDashboard />
      </div>
    </ExpenseProvider>
  );
};

export default AuthenticatedIndex;
