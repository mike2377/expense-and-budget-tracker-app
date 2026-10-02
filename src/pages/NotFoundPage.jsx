import { Link } from 'react-router-dom'
import { Home, AlertCircle } from 'lucide-react'

export const NotFoundPage = () => (
  <div className='text-center py-5'>
    <div
      className='mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle'
      style={{
        width: '120px',
        height: '120px',
        background: 'rgba(var(--bs-primary-rgb), 0.1)'
      }}
    >
      <AlertCircle size={60} className='text-primary' />
    </div>
    <h1 className='display-1 fw-bold text-primary mb-3'>404</h1>
    <h2 className='mb-3'>Page not found</h2>
    <p className='text-muted mb-4'>
      Oops ! The page you are looking for does not exist or has been moved
    </p>
    <Link to='/' className='btn btn-primary btn-lg'>
      <Home size={20} className='me-2' /> Return to home
    </Link>
  </div>
)
