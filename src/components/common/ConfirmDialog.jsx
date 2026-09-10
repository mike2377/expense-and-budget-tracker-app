import { AlertTriangle } from 'lucide-react'
export const ConfirmDialog = ({
  show,
  title,
  message,
  onConfirm,
  onCancel
}) => {
  if (!show) return null
  return (
    <div
      className='modal show d-block'
      tabIndex='-1'
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div className='modal-dialog modal-dialog-centered modal-sm'>
        <div className='modal-content'>
          <div className='modal-body text-center p-4'>
            <div
              className='mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle bg-danger text-white'
              style={{ width: '64px', height: '64px' }}
            >
              <AlertTriangle size={32} />
            </div>
            <h5 className='mb-2'>{title}</h5>
            <p className='text-muted mb-4'>{message}</p>
            <div className='d-flex gap-2'>
              <button
                className='btn btn-outline-secondary flex-fill'
                onClick={onCancel}
              >
                Annuler
              </button>
              <button className='btn btn-danger flex-fill' onClick={onConfirm}>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
