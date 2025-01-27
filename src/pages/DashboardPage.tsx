import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { useProfile } from '../context/ProfileContext';
import { Dashboard } from '../components/Dashboard';

export function DashboardPage() {
  const { transactions } = useTransactions();
  const { currentProfile } = useProfile();
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );

  const filteredTransactions = transactions.filter(
    (t) => t.profile === currentProfile && t.date.startsWith(selectedMonth)
  );

  const calculateCategoryStats = (type: 'income' | 'expense') => {
    const categoryMap = new Map<string, number>();
    
    filteredTransactions
      .filter((t) => t.type === type)
      .forEach((t) => {
        const current = categoryMap.get(t.category) || 0;
        categoryMap.set(t.category, current + t.amount);
      });

    return Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const stats = {
    totalIncome: filteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0),
    totalExpenses: filteredTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0),
    balance: filteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0) -
      filteredTransactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0),
    categoryExpenses: calculateCategoryStats('expense'),
    categoryIncome: calculateCategoryStats('income'),
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <Dashboard
        transactions={filteredTransactions}
        stats={stats}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />
    </div>
  );
}