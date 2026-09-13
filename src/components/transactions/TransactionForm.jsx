import { useState } from 'react'
import { useTransactions } from '../../hooks/useTransactions'
import { X, Save, Plus, TrendingUp, TrendingDown, Sparkles, Pencil } from 'lucide-react'

export const TransactionForm = ({ editingTx, onClose }) => {
  const { categories, addTransaction, updateTransaction } = useTransactions()

  const [formData, setFormData] = useState(() => {
    if (editingTx) {
      return {
        type: editingTx.type,
        amount: editingTx.amount.toString(),
        categoryId: editingTx.categoryId,
        date: editingTx.date,
        note: editingTx.note || ''
      }
    }
    return {
      type: 'expense',
      amount: '',
      categoryId: '',
      date: new Date().toISOString().split('T')[0],
      note: ''
    }
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validate = () => {
    const newErrors = {}
    const amount = parseFloat(formData.amount)
    if (!formData.amount || Number.isNaN(amount) || amount <= 0) newErrors.amount = 'Amount > 0 required'
    if (!formData.categoryId) newErrors.categoryId = 'Category required'
    if (!formData.date) newErrors.date = 'Date required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ amount: true, categoryId: true, date: true })
    if (!validate()) return

    const txData = {
      id: editingTx ? editingTx.id : crypto.randomUUID(),
      type: formData.type,
      amount: parseFloat(formData.amount),
      categoryId: formData.categoryId,
      date: formData.date,
      note: formData.note.trim()
    }

    if (editingTx) {
      updateTransaction(editingTx.id, txData)
    } else {
      addTransaction(txData)
    }
    onClose()
  }

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true })
    validate()
  }

  const currentCategories = categories.filter((c) => c.type === formData.type)

  return (
    <div className='card shadow-sm mb-4 border-0'>
      <div className='card-body p-4'>
        <div className='d-flex justify-content-between align-items-center mb-4'>
          <h4 className='mb-0 fw-bold d-flex align-items-center gap-2'>
            {editingTx
              ? (
                <>
                  <Pencil size={22} className='text-primary' />
                  Edit transaction
                </>
                )
              : (
                <>
                  <Sparkles size={22} className='text-primary' />
                  Add transaction
                </>
                )}
          </h4>
          <button
            className='btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center'
            onClick={onClose}
            style={{ width: '36px', height: '36px', padding: 0 }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='row g-3'>
            {/* Type */}
            <div className='col-md-6'>
              <label className='form-label fw-semibold'>Type</label>
              <div className='btn-group w-100' role='group'>
                <input
                  type='radio'
                  className='btn-check'
                  name='type'
                  id='type-expense'
                  checked={formData.type === 'expense'}
                  onChange={() => setFormData({ ...formData, type: 'expense', categoryId: '' })}
                />
                <label className='btn btn-outline-danger d-flex align-items-center justify-content-center gap-2' htmlFor='type-expense'>
                  <TrendingDown size={16} /> Expense
                </label>

                <input
                  type='radio'
                  className='btn-check'
                  name='type'
                  id='type-income'
                  checked={formData.type === 'income'}
                  onChange={() => setFormData({ ...formData, type: 'income', categoryId: '' })}
                />
                <label className='btn btn-outline-success d-flex align-items-center justify-content-center gap-2' htmlFor='type-income'>
                  <TrendingUp size={16} /> Income
                </label>
              </div>
            </div>

            {/* Montant */}
            <div className='col-md-6'>
              <label className='form-label fw-semibold'>Amount (FCFA) *</label>
              <input
                type='number'
                step='0.01'
                className={`form-control ${touched.amount && errors.amount ? 'is-invalid' : ''}`}
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                onBlur={() => handleBlur('amount')}
                placeholder='0'
              />
              {touched.amount && errors.amount && <div className='invalid-feedback'>{errors.amount}</div>}
            </div>

            {/* Category */}
            <div className='col-md-6'>
              <label className='form-label fw-semibold'>Category *</label>
              <select
                className={`form-select ${touched.categoryId && errors.categoryId ? 'is-invalid' : ''}`}
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                onBlur={() => handleBlur('categoryId')}
              >
                <option value=''>Select...</option>
                {currentCategories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              {touched.categoryId && errors.categoryId && <div className='invalid-feedback'>{errors.categoryId}</div>}
            </div>

            {/* Date */}
            <div className='col-md-6'>
              <label className='form-label fw-semibold'>Date *</label>
              <input
                type='date'
                className={`form-control ${touched.date && errors.date ? 'is-invalid' : ''}`}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                onBlur={() => handleBlur('date')}
              />
              {touched.date && errors.date && <div className='invalid-feedback'>{errors.date}</div>}
            </div>

            {/* Note */}
            <div className='col-12'>
              <label className='form-label fw-semibold'>Note (optional)</label>
              <input
                type='text'
                className='form-control'
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                maxLength={150}
                placeholder='Additional details...'
              />
            </div>

            {/* Boutons */}
            <div className='col-12 d-flex gap-2 justify-content-end pt-3 border-top'>
              <button type='button' className='btn btn-outline-secondary' onClick={onClose}>
                Cancel
              </button>
              <button type='submit' className='btn btn-primary d-flex align-items-center gap-2'>
                {editingTx ? <Save size={18} /> : <Plus size={18} />}
                {editingTx ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
