import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Transaction } from "../types";

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
  editTransaction?: Transaction;
}

const categories = [
  "Salário",
  "Cartão",
  "Financiamento",
  "Saúde",
  "Contas",
  "Educação",
  "Colaboradores",
];

const initialFormData = {
  description: "",
  amount: 0,
  type: "expense",
  category: "",
  date: new Date().toISOString().split("T")[0],
  status: "pending",
  scheduled: false,
} as any;

export function TransactionForm({
  isOpen,
  onClose,
  onSubmit,
  editTransaction,
}: TransactionFormProps) {
  const [formData, setFormData] =
    useState<Partial<Transaction>>(initialFormData);

  useEffect(() => {
    if (editTransaction) {
      setFormData(editTransaction);
    } else {
      setFormData(initialFormData);
    }
  }, [editTransaction, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Omit<Transaction, "id">);
    setFormData(initialFormData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            {editTransaction ? "Editar Transação" : "Nova Transação"}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Descrição"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
              <Input
                type="number"
                label="Valor"
                value={formData.amount?.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: parseFloat(e.target.value),
                  })
                }
                required
              />
              <Select
                label="Tipo"
                selectedKeys={[formData.type || "expense"]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as "income" | "expense",
                  })
                }
                required
              >
                <SelectItem key="income" value="income">
                  Receita
                </SelectItem>
                <SelectItem key="expense" value="expense">
                  Despesa
                </SelectItem>
              </Select>
              <Select
                label="Categoria"
                selectedKeys={[formData.category || ""]}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Status"
                selectedKeys={[formData.status || "pending"]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "paid" | "pending" | "scheduled",
                  })
                }
                required
              >
                <SelectItem key="paid" value="paid">
                  Pago
                </SelectItem>
                <SelectItem key="pending" value="pending">
                  Pendente
                </SelectItem>
                <SelectItem key="scheduled" value="scheduled">
                  Agendado
                </SelectItem>
              </Select>
              <Input
                type="date"
                label="Data"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
              <div className="flex items-center gap-2">
                <Switch
                  isSelected={formData.scheduled}
                  onValueChange={(value) =>
                    setFormData({ ...formData, scheduled: value })
                  }
                />
                <span>Transação Programada</span>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancelar
            </Button>
            <Button color="primary" type="submit">
              {editTransaction ? "Atualizar" : "Adicionar"} Transação
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
