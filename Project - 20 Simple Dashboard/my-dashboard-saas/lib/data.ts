export interface DailyData {
  date: string;
  users: number;
  revenue: number;
  orders: number;
}

export interface MonthlyData {
  month: string;
  subscribers: number;
  mrr: number; // Monthly Recurring Revenue
}

export const generateRandomDailyData = (numDays: number): DailyData[] => {
  const data: DailyData[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - numDays); // Start from numDays ago

  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    data.push({
      date: currentDate.toISOString().split('T')[0],
      users: Math.floor(Math.random() * 500) + 50,
      revenue: parseFloat((Math.random() * 5000 + 1000).toFixed(2)),
      orders: Math.floor(Math.random() * 100) + 10,
    });
  }
  return data;
};

export const generateRandomMonthlyData = (numMonths: number): MonthlyData[] => {
  const data: MonthlyData[] = [];
  const today = new Date();

  for (let i = 0; i < numMonths; i++) {
    const d = new Date(today.getFullYear(), today.getMonth() - (numMonths - 1 - i), 1);
    const monthName = d.toLocaleString('default', { month: 'short' });
    const year = d.getFullYear().toString().slice(2); // Get last two digits of year

    data.push({
      month: `${monthName} '${year}`,
      subscribers: Math.floor(Math.random() * 2000) + 500,
      mrr: parseFloat((Math.random() * 10000 + 2000).toFixed(2)),
    });
  }
  return data;
};

// You can expose these via an API route if you want to simulate fetching
// For now, we'll use them directly on the client.