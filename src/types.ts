export type ProfileType = 'personal' | 'yoma' | 'mou';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  status: 'paid' | 'pending' | 'scheduled';
  scheduled: boolean;
  profile: ProfileType;
}

export interface MonthlyStats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  categoryExpenses: { name: string; value: number }[];
  categoryIncome: { name: string; value: number }[];
}

export interface Profile {
  id: ProfileType;
  name: string;
  description: string;
}