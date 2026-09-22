import { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { useFilters } from "../hooks/useFilters";
import { TransactionForm } from "../components/transactions/TransactionForm";
import { TransactionList } from "../components/transactions/TransactionList";
import { TransactionFilters } from "../components/transactions/TransactionFilters";
import { MonthSelector } from "../components/dashboard/MonthSelector";
import { Plus, Receipt } from "lucide-react";

export const TransactionsPage = () => {
  const { monthFilteredTransactions, selectedMonth, setSelectedMonth } =
    useTransactions();
  const [showForm, setShowForm] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  const {
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    categoryFilter,
    setCategoryFilter,
    filteredTransactions,
  } = useFilters(monthFilteredTransactions);

  const handleEdit = (tx) => {
    setEditingTx(tx);
    setShowForm(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTx(null);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div className="flex-grow-1">
          <h2 className="mb-1 fw-bold d-flex align-items-center gap-2">
            <Receipt size={28} className="text-primary" />
            <span>Transactions</span>
          </h2>
          <p className="text-muted mb-0">Manage your transactions</p>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <MonthSelector
            selectedMonth={selectedMonth}
            onChange={setSelectedMonth}
          />
          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => {
              setEditingTx(null);
              setShowForm(true);
            }}
          >
            <Plus size={18} />
            <span className="d-none d-sm-inline">Add Transaction</span>
          </button>
        </div>
      </div>

      {showForm && (
        <TransactionForm
          key={editingTx ? editingTx.id : "new"}
          editingTx={editingTx}
          onClose={handleCloseForm}
        />
      )}

      <TransactionFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      <TransactionList
        transactions={filteredTransactions}
        onEdit={handleEdit}
      />
    </div>
  );
};
