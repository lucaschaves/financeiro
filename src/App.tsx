import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { TransactionProvider } from './context/TransactionContext';
import { ProfileProvider } from './context/ProfileContext';

export default function App() {
  return (
    <NextUIProvider>
      <ProfileProvider>
        <TransactionProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <div className="p-8">
                <div className="max-w-7xl mx-auto">
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                  </Routes>
                </div>
              </div>
            </div>
          </BrowserRouter>
        </TransactionProvider>
      </ProfileProvider>
    </NextUIProvider>
  );
}