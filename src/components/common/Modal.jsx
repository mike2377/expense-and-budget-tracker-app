import { useEffect } from 'react'

export const Modal = ({ show, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [show])

  if (!show) return null
  return (
    <div
      className='modal show d-block'
      tabIndex='-1'
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      <div
        className={`modal-dialog modal-dialog-centered modal-dialog-scrollable modal-${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='modal-content'>
          <div className='modal-header border-0 pb-0'>
            <h5 className='modal-title fw-bold'>{title}</h5>
            <button
              type='button'
              className='btn-close'
              onClick={onClose}
            />
          </div>
          <div className='modal-body'>{children}</div>
        </div>
      </div>
    </div>
  )
}
