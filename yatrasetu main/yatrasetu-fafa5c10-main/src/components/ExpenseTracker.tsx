
import React, { useState, useEffect } from 'react';
import { DollarSign, Plus, PieChart, Calendar, Receipt } from 'lucide-react';

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: 'food',
    description: ''
  });

  const categories = [
    { value: 'food', label: 'Food • ખાવાનું', color: 'bg-orange-500' },
    { value: 'travel', label: 'Travel • મુસાફરી', color: 'bg-blue-500' },
    { value: 'stay', label: 'Stay • રહેવું', color: 'bg-green-500' },
    { value: 'shopping', label: 'Shopping • ખરીદી', color: 'bg-purple-500' },
    { value: 'other', label: 'Other • અન્ય', color: 'bg-gray-500' }
  ];

  useEffect(() => {
    const savedExpenses = localStorage.getItem('yatraSetu-expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('yatraSetu-expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!newExpense.amount || !newExpense.description) return;

    const expense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      description: newExpense.description,
      date: new Date().toLocaleDateString()
    };

    setExpenses([...expenses, expense]);
    setNewExpense({ amount: '', category: 'food', description: '' });
    setShowForm(false);
  };

  const getTotalByCategory = () => {
    const totals = categories.map(cat => ({
      ...cat,
      total: expenses
        .filter(exp => exp.category === cat.value)
        .reduce((sum, exp) => sum + exp.amount, 0)
    }));
    return totals;
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <DollarSign className="w-8 h-8 text-green-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Expense Tracker • ખર્ચ ટ્રેકર
          </h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-xl mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold">₹{totalExpense.toFixed(2)}</div>
          <div className="text-green-100">Total Spent • કુલ ખર્ચ</div>
        </div>
      </div>

      {/* Add Expense Form */}
      {showForm && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl mb-6">
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Amount • રકમ"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
            />
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Description • વર્ણન"
              value={newExpense.description}
              onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
            />
            <button
              onClick={addExpense}
              className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Add Expense • ખર્ચ ઉમેરો
            </button>
          </div>
        </div>
      )}

      {/* Category Breakdown */}
      <div className="space-y-3 mb-6">
        {getTotalByCategory().map(cat => cat.total > 0 && (
          <div key={cat.value} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="flex items-center">
              <div className={`w-4 h-4 ${cat.color} rounded-full mr-3`}></div>
              <span className="text-gray-700 dark:text-gray-300">{cat.label}</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white">₹{cat.total.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Recent Expenses */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
          <Receipt className="w-5 h-5 mr-2" />
          Recent Expenses • તાજેતરના ખર્ચ
        </h3>
        {expenses.slice(-5).reverse().map(expense => (
          <div key={expense.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{expense.description}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{expense.date}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900 dark:text-white">₹{expense.amount}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{expense.category}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseTracker;
