export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export const formatMonthYear = (monthString) => {
  const [year, month] = monthString.split('-')
  return new Date(year, parseInt(month) - 1, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
}

export const getCurrentMonth = () => new Date().toISOString().slice(0, 7)
