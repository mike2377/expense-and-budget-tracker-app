export const BudgetProgress = ({ percentage, isOver }) => (
  <div className='progress' style={{ height: '12px' }}>
    <div
      className={`progress-bar ${isOver ? 'bg-danger' : 'bg-success'}`}
      role='progressbar'
      style={{ width: `${percentage}%` }}
      aria-valuenow={percentage}
      aria-valuemin='0'
      aria-valuemax='100'
    />
  </div>
)
