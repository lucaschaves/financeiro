import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { TransactionForm } from "../components/TransactionForm";
import { TransactionList } from "../components/TransactionList";
import { useProfile } from "../context/ProfileContext";
import { useTransactions } from "../context/TransactionContext";
import { Transaction } from "../types";

export function TransactionsPage() {
  const {
    transactions,
    updateTransaction,
    deleteTransaction,
    addTransaction,
    isLoading,
    error,
  } = useTransactions();
  const { currentProfile } = useProfile();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<
    Transaction | undefined
  >();
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(
        (transaction) =>
          transaction.profile === currentProfile &&
          transaction.date.startsWith(selectedMonth) &&
          (transaction.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            transaction.category
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, currentProfile, selectedMonth, searchQuery]);

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleAddTransaction = async (transaction: Omit<Transaction, "id">) => {
    try {
      await addTransaction({ ...transaction, profile: currentProfile });
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleUpdateTransaction = async (
    updatedTransaction: Omit<Transaction, "id">
  ) => {
    if (editingTransaction) {
      try {
        await updateTransaction(editingTransaction.id, {
          ...updatedTransaction,
          profile: currentProfile,
        });
        setEditingTransaction(undefined);
        setIsFormOpen(false);
      } catch (error) {
        console.error("Error updating transaction:", error);
      }
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteTransaction(id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2025, i, 1);
    return {
      value: date.toISOString().slice(0, 7),
      label: date.toLocaleString("pt-BR", { month: "long" }),
    };
  });

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Transações</h2>
        <Button
          color="primary"
          onPress={() => setIsFormOpen(true)}
          startContent={<PlusCircle size={20} />}
        >
          Nova Transação
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Select
          label="Filtrar por Mês"
          selectedKeys={[selectedMonth]}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="max-w-xs"
        >
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </Select>

        <Input
          type="text"
          label="Buscar transações"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center p-8">
          <Spinner size="lg" />
        </div>
      ) : (
        <TransactionList
          transactions={filteredTransactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
      )}

      <TransactionForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTransaction(undefined);
        }}
        onSubmit={
          editingTransaction ? handleUpdateTransaction : handleAddTransaction
        }
        editTransaction={editingTransaction}
      />
    </div>
  );
}
