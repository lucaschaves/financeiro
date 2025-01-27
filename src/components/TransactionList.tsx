import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Button,
} from '@nextui-org/react';
import { Pencil, Trash2, Clock } from 'lucide-react';
import { Transaction } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  paid: 'success',
  pending: 'warning',
  scheduled: 'primary',
} as const;

export function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
  return (
    <Table aria-label="Tabela de transações">
      <TableHeader>
        <TableColumn>DATA</TableColumn>
        <TableColumn>DESCRIÇÃO</TableColumn>
        <TableColumn>CATEGORIA</TableColumn>
        <TableColumn>VALOR</TableColumn>
        <TableColumn>TIPO</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>PROGRAMADA</TableColumn>
        <TableColumn>AÇÕES</TableColumn>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{format(new Date(transaction.date), 'dd MMM, yyyy', { locale: ptBR })}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>R$ {transaction.amount.toFixed(2)}</TableCell>
            <TableCell>
              <Chip
                color={transaction.type === 'income' ? 'success' : 'danger'}
                variant="flat"
              >
                {transaction.type === 'income' ? 'Receita' : 'Despesa'}
              </Chip>
            </TableCell>
            <TableCell>
              <Chip
                color={statusColors[transaction.status]}
                variant="flat"
              >
                {transaction.status === 'paid' ? 'Pago' : 
                 transaction.status === 'pending' ? 'Pendente' : 'Agendado'}
              </Chip>
            </TableCell>
            <TableCell>
              {transaction.scheduled && (
                <Tooltip content="Transação Programada">
                  <Clock size={16} className="text-primary" />
                </Tooltip>
              )}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Tooltip content="Editar transação">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => onEdit(transaction)}
                  >
                    <Pencil size={16} />
                  </Button>
                </Tooltip>
                <Tooltip content="Excluir transação">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="danger"
                    onPress={() => onDelete(transaction.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}