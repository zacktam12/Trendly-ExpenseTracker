import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  iconColor?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  iconColor = 'text-purple-500',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Animated Icon Container */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 rounded-full blur-2xl animate-pulse" />
        <div className={`relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full p-6 ${iconColor}`}>
          <Icon className="h-16 w-16 sm:h-20 sm:w-20" strokeWidth={1.5} />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-md">
        {description}
      </p>

      {/* Action Button */}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          {actionLabel}
        </Button>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-40 animate-ping" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-pink-400 rounded-full opacity-40 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
    </div>
  );
};

export default EmptyState;

