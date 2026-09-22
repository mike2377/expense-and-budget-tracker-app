import { useState, useMemo } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import { useTheme } from '../hooks/useTheme'
import {
  Plus,
  Trash2,
  Settings as SettingsIcon,
  Sun,
  Moon,
  Database,
  Palette,
  Sparkles,
  Wallet,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Receipt
} from 'lucide-react'
import { generateSeedTransactions } from '../data/seed'
import { CategoryIcon } from '../components/common/CategoryIcon'
import { formatCurrency } from '../utils/formatCurrency'
import { calculateTotals } from '../utils/calculations'

export const SettingsPage = () => {
  const {
    categories,
    addCategory,
    deleteCategory,
    transactions,
    setTransactions
  } = useTransactions()
  const { theme, toggleTheme } = useTheme()
  const [newCat, setNewCat] = useState({
    name: '',
    type: 'expense',
    color: '#3498db',
    icon: 'Circle'
  })

  // ✅ SOLUTION : Utiliser JSON.stringify pour forcer le recalcul
  // quand le contenu de transactions change (pas juste la référence)
  const { income, expense } = useMemo(() => {
    return calculateTotals(transactions)
  }, [JSON.stringify(transactions)]) // ← Changement clé ici

  const balance = income - expense

  const handleAdd = (e) => {
    e.preventDefault()
    if (!newCat.name.trim()) return
    addCategory(newCat)
    setNewCat({ name: '', type: 'expense', color: '#3498db', icon: 'Circle' })
  }

  const handleSeedData = () => {
    if (window.confirm('Add demo data?')) {
      setTransactions((prev) => [...generateSeedTransactions(), ...prev])
    }
  }

  const handleClearData = () => {
    if (
      window.confirm(
        'Delete ALL transactions ? This action is irreversible.'
      )
    ) {
      setTransactions([])
    }
  }

  const availableIcons = [
    'Wallet',
    'Briefcase',
    'UtensilsCrossed',
    'Car',
    'Home',
    'Gamepad2',
    'Heart',
    'ShoppingBag',
    'GraduationCap',
    'TrendingUp'
  ]

  return (
    <div>
      <div className='mb-4'>
        <h2 className='mb-1 fw-bold d-flex align-items-center gap-2'>
          <SettingsIcon size={28} className='text-primary' />
          Settings
        </h2>
        <p className='text-muted mb-0'>Customize your experience</p>
      </div>

      <div className='row g-4'>
        {/* Appearance Section */}
        <div className='col-lg-6'>
          <div className='card p-4 border-0 shadow-sm h-100'>
            <h5 className='fw-bold mb-3 d-flex align-items-center gap-2'>
              <Palette size={20} className='text-primary' />
              Appearance
            </h5>

            <div
              className='text-center p-4 mb-3 rounded-3'
              style={{
                background:
                  theme === 'light'
                    ? 'linear-gradient(135deg, #fff9e6 0%, #fff3cc 100%)'
                    : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                border: `2px solid ${theme === 'light' ? '#ffd700' : '#4a5568'}`
              }}
            >
              <div className='mb-2'>
                {theme === 'light'
                  ? (
                    <Sun size={48} className='text-warning' />
                    )
                  : (
                    <Moon size={48} className='text-info' />
                    )}
              </div>
              <h4
                className={`fw-bold mb-1 ${theme === 'light' ? 'text-dark' : 'text-light'}`}
              >
                {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
              </h4>
              <p
                className={`small mb-0 ${theme === 'light' ? 'text-muted' : 'text-light opacity-75'}`}
              >
                {theme === 'light'
                  ? 'Bright and sunny interface'
                  : 'Dark and restful interface'}
              </p>
            </div>

            <button
              className='btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2'
              onClick={toggleTheme}
              style={{ padding: '12px', fontSize: '1.1rem' }}
            >
              {theme === 'light'
                ? (
                  <>
                    <Moon size={20} />
                    Switch to Dark Mode
                  </>
                  )
                : (
                  <>
                    <Sun size={20} />
                    Switch to Light Mode
                  </>
                  )}
            </button>
          </div>
        </div>

        {/* Data Section */}
        <div className='col-lg-6'>
          <div className='card p-4 border-0 shadow-sm h-100'>
            <h5 className='fw-bold mb-3 d-flex align-items-center gap-2'>
              <Database size={20} className='text-primary' />
              Data
            </h5>

            {/* Visual Statistics */}
            <div className='row g-2 mb-3'>
              <div className='col-4'>
                <div
                  className='text-center p-3 rounded-3'
                  style={{
                    background:
                      'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
                    border: '1px solid rgba(102, 126, 234, 0.2)'
                  }}
                >
                  <Receipt size={24} className='text-primary mb-1' />
                  <div className='h4 fw-bold mb-0 text-primary'>
                    {transactions.length}
                  </div>
                  <small className='text-muted'>Transactions</small>
                </div>
              </div>
              <div className='col-4'>
                <div
                  className='text-center p-3 rounded-3'
                  style={{
                    background:
                      'linear-gradient(135deg, #28c76a20 0%, #38ef7d20 100%)',
                    border: '1px solid rgba(40, 199, 106, 0.2)'
                  }}
                >
                  <TrendingUp size={24} className='text-success mb-1' />
                  <div className='h6 fw-bold mb-0 text-success'>
                    {formatCurrency(income)}
                  </div>
                  <small className='text-muted'>Incomes</small>
                </div>
              </div>
              <div className='col-4'>
                <div
                  className='text-center p-3 rounded-3'
                  style={{
                    background:
                      'linear-gradient(135deg, #e74c3c20 0%, #f45c4320 100%)',
                    border: '1px solid rgba(231, 76, 60, 0.2)'
                  }}
                >
                  <TrendingDown size={24} className='text-danger mb-1' />
                  <div className='h6 fw-bold mb-0 text-danger'>
                    {formatCurrency(expense)}
                  </div>
                  <small className='text-muted'>Expenses</small>
                </div>
              </div>
            </div>

            {/* Balance Indicator */}
            <div
              className='p-3 rounded-3 mb-3 d-flex justify-content-between align-items-center'
              style={{
                background:
                  balance >= 0
                    ? 'linear-gradient(135deg, #28c76a15 0%, #38ef7d15 100%)'
                    : 'linear-gradient(135deg, #e74c3c15 0%, #f45c4315 100%)',
                border: `1px solid ${balance >= 0 ? 'rgba(40, 199, 106, 0.3)' : 'rgba(231, 76, 60, 0.3)'}`
              }}
            >
              <div className='d-flex align-items-center gap-2'>
                <Wallet
                  size={20}
                  className={balance >= 0 ? 'text-success' : 'text-danger'}
                />
                <span className='fw-semibold'>Balance</span>
              </div>
              <span
                className={`h5 mb-0 fw-bold ${balance >= 0 ? 'text-success' : 'text-danger'}`}
              >
                {formatCurrency(balance)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className='d-flex gap-2'>
              <button
                className='btn btn-outline-primary flex-fill d-flex align-items-center justify-content-center gap-2'
                onClick={handleSeedData}
                style={{ padding: '10px' }}
              >
                <Sparkles size={18} />
                <span>Demo Data</span>
              </button>
              <button
                className='btn btn-outline-danger flex-fill d-flex align-items-center justify-content-center gap-2'
                onClick={handleClearData}
                disabled={transactions.length === 0}
                style={{ padding: '10px' }}
              >
                <Trash2 size={18} />
                <span>Clear All Data</span>
              </button>
            </div>

            {transactions.length === 0 && (
              <div className='alert alert-warning mt-3 p-2 small mb-0 d-flex align-items-center gap-2 border-0'>
                <AlertTriangle size={16} />
                <span className='mb-0'>
                  No transactions. Click on "Demo Data" to get started.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Add Custom Category */}
        <div className='col-12'>
          <div className='card p-4 border-0 shadow-sm'>
            <h5 className='fw-bold mb-3 d-flex align-items-center gap-2'>
              <Sparkles size={20} className='text-primary' />
              Add Custom Category
            </h5>
            <form onSubmit={handleAdd}>
              <div className='row g-3 align-items-end'>
                <div className='col-md-3'>
                  <label className='form-label fw-semibold'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    value={newCat.name}
                    onChange={(e) =>
                      setNewCat({ ...newCat, name: e.target.value })}
                    placeholder='E.g., Subscriptions'
                    required
                    style={{ height: '42px' }}
                  />
                </div>
                <div className='col-md-2'>
                  <label className='form-label fw-semibold'>Type</label>
                  <select
                    className='form-select'
                    value={newCat.type}
                    onChange={(e) =>
                      setNewCat({ ...newCat, type: e.target.value })}
                    style={{ height: '42px' }}
                  >
                    <option value='expense'>Expenses</option>
                    <option value='income'>Income</option>
                  </select>
                </div>
                <div className='col-md-3'>
                  <label className='form-label fw-semibold'>Icon</label>
                  <select
                    className='form-select'
                    value={newCat.icon}
                    onChange={(e) =>
                      setNewCat({ ...newCat, icon: e.target.value })}
                    style={{ height: '42px' }}
                  >
                    {availableIcons.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='col-md-2'>
                  <label className='form-label fw-semibold'>Color</label>
                  <input
                    type='color'
                    className='form-control form-control-color'
                    value={newCat.color}
                    onChange={(e) =>
                      setNewCat({ ...newCat, color: e.target.value })}
                    style={{ height: '42px', width: '100%' }}
                  />
                </div>
                <div className='col-md-2'>
                  <button
                    type='submit'
                    className='btn btn-primary w-100 d-flex align-items-center justify-content-center'
                    style={{ height: '42px' }}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* List of Categories */}
        <div className='col-12'>
          <div className='card border-0 shadow-sm'>
            <div className='card-header d-flex justify-content-between align-items-center bg-transparent border-0 pt-3'>
              <h5 className='mb-0 fw-bold'>Categories ({categories.length})</h5>
            </div>
            <div className='list-group list-group-flush'>
              {categories.map((c) => (
                <div
                  key={c.id}
                  className='list-group-item d-flex justify-content-between align-items-center py-3 border-0 border-bottom'
                >
                  <div className='d-flex align-items-center gap-3'>
                    <div
                      className='rounded-circle d-flex align-items-center justify-content-center'
                      style={{
                        width: '44px',
                        height: '44px',
                        background: `${c.color}20`,
                        border: `2px solid ${c.color}`
                      }}
                    >
                      <CategoryIcon
                        iconName={c.icon}
                        size={20}
                        color={c.color}
                      />
                    </div>
                    <div>
                      <strong>{c.name}</strong>
                      <div>
                        <span
                          className={`badge ${c.type === 'income' ? 'bg-success' : 'bg-danger'} ms-2 d-inline-flex align-items-center gap-1`}
                        >
                          {c.type === 'income'
                            ? (
                              <>
                                <Wallet size={12} /> Income
                              </>
                              )
                            : (
                              <>
                                <TrendingDown size={12} /> Expenses
                              </>
                              )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    className='btn btn-sm btn-outline-danger rounded-circle d-flex align-items-center justify-content-center'
                    onClick={() => deleteCategory(c.id)}
                    style={{ width: '36px', height: '36px', padding: 0 }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
