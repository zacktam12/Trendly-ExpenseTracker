import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, PlusCircle, BarChart3, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileBottomNavProps {
  onAddExpense?: () => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onAddExpense }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 dark:bg-gray-900/95 border-t border-border backdrop-blur supports-[backdrop-filter]:bg-background/80 dark:supports-[backdrop-filter]:bg-gray-900/80 safe-area-inset-bottom">
      <div className="grid grid-cols-4 h-16 max-w-lg mx-auto px-2">
        {/* Home/Dashboard */}
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className={`flex flex-col items-center justify-center gap-1 h-full rounded-none hover:bg-transparent ${
            isActive('/dashboard') || isActive('/')
              ? 'text-purple-600 dark:text-purple-400'
              : 'text-muted-foreground'
          }`}
        >
          <Home className={`h-5 w-5 ${isActive('/dashboard') || isActive('/') ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium">Home</span>
        </Button>

        {/* Charts/Analytics */}
        <Button
          variant="ghost"
          onClick={() => {
            navigate('/dashboard');
            // Optionally trigger tab change to charts
          }}
          className="flex flex-col items-center justify-center gap-1 h-full rounded-none hover:bg-transparent text-muted-foreground"
        >
          <BarChart3 className="h-5 w-5" />
          <span className="text-xs font-medium">Charts</span>
        </Button>

        {/* Add Expense (Primary Action) */}
        <Button
          onClick={onAddExpense}
          className="flex flex-col items-center justify-center gap-1 h-full rounded-none bg-transparent hover:bg-transparent p-0 relative"
        >
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110">
              <img 
                src="/logo.png" 
                alt="Add Expense" 
                className="h-6 w-6 object-contain"
              />
            </div>
          </div>
          <span className="text-xs font-medium text-transparent mt-4">Add</span>
        </Button>

        {/* Profile */}
        <Button
          variant="ghost"
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center justify-center gap-1 h-full rounded-none hover:bg-transparent ${
            isActive('/profile')
              ? 'text-purple-600 dark:text-purple-400'
              : 'text-muted-foreground'
          }`}
        >
          <User className={`h-5 w-5 ${isActive('/profile') ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium">Profile</span>
        </Button>
      </div>
    </nav>
  );
};

export default MobileBottomNav;

