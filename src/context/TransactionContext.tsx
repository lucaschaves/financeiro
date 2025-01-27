import React, { createContext, useContext, useState, useEffect } from 'react';
import { ref, onValue, push, update, remove } from 'firebase/database';
import { db } from '../config/firebase';
import { Transaction } from '../types';

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  updateTransaction: (id: string, transaction: Omit<Transaction, 'id'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const transactionsRef = ref(db, 'transactions');
      
      // Configurar listener para atualizações em tempo real
      const unsubscribe = onValue(transactionsRef, (snapshot) => {
        setIsLoading(true);
        try {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const transactionsList = Object.entries(data).map(([id, transaction]) => ({
              id,
              ...(transaction as Omit<Transaction, 'id'>),
            }));
            setTransactions(transactionsList);
            setError(null);
          } else {
            setTransactions([]);
          }
        } catch (error) {
          console.error('Erro ao processar dados:', error);
          setError('Erro ao carregar transações');
        } finally {
          setIsLoading(false);
        }
      }, (error) => {
        console.error('Erro na conexão:', error);
        setError('Erro na conexão com o banco de dados');
        setIsLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Erro ao configurar listener:', error);
      setError('Erro ao conectar com o banco de dados');
      setIsLoading(false);
    }
  }, []);

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const transactionsRef = ref(db, 'transactions');
      await push(transactionsRef, transaction);
      return Promise.resolve();
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      throw new Error('Erro ao adicionar transação');
    }
  };

  const updateTransaction = async (id: string, transaction: Omit<Transaction, 'id'>) => {
    try {
      const transactionRef = ref(db, `transactions/${id}`);
      await update(transactionRef, transaction);
      return Promise.resolve();
    } catch (error) {
      console.error('Erro ao atualizar transação:', error);
      throw new Error('Erro ao atualizar transação');
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      const transactionRef = ref(db, `transactions/${id}`);
      await remove(transactionRef);
      return Promise.resolve();
    } catch (error) {
      console.error('Erro ao excluir transação:', error);
      throw new Error('Erro ao excluir transação');
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        isLoading,
        error
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}