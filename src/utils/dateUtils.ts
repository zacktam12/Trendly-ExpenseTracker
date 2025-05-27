
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getMonthName = (month: number): string => {
  const date = new Date();
  date.setMonth(month);
  return date.toLocaleString('default', { month: 'long' });
};

export const getCurrentMonthYear = (): { month: number; year: number } => {
  const date = new Date();
  return {
    month: date.getMonth(),
    year: date.getFullYear()
  };
};

export const getLastSixMonths = (): { month: number; year: number; label: string }[] => {
  const result = [];
  const currentDate = new Date();
  
  for (let i = 0; i < 6; i++) {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - i);
    
    result.push({
      month: date.getMonth(),
      year: date.getFullYear(),
      label: `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`
    });
  }
  
  return result.reverse();
};
