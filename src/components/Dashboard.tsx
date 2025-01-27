import React from 'react';
import { Card, CardBody, Select, SelectItem } from '@nextui-org/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Transaction, MonthlyStats } from '../types';

interface DashboardProps {
  transactions: Transaction[];
  stats: MonthlyStats;
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export function Dashboard({ transactions, stats, selectedMonth, onMonthChange }: DashboardProps) {
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2024, i, 1);
    return {
      value: date.toISOString().slice(0, 7),
      label: date.toLocaleString('pt-BR', { month: 'long' }),
    };
  });

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Select
          label="Filtrar por Mês"
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="max-w-xs"
        >
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold mb-2">Receitas Totais</h3>
            <p className="text-2xl text-green-500">
              R$ {stats.totalIncome.toFixed(2)}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold mb-2">Despesas Totais</h3>
            <p className="text-2xl text-red-500">
              R$ {stats.totalExpenses.toFixed(2)}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold mb-2">Saldo</h3>
            <p className={`text-2xl ${stats.balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              R$ {stats.balance.toFixed(2)}
            </p>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-4">
          <CardBody>
            <h3 className="text-lg font-semibold mb-4">Despesas por Categoria</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.categoryExpenses}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {stats.categoryExpenses.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card className="p-4">
          <CardBody>
            <h3 className="text-lg font-semibold mb-4">Receitas por Categoria</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.categoryIncome}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {stats.categoryIncome.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}