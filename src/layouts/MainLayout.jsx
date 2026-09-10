import { NavLink, Outlet } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import {
  LayoutDashboard,
  Receipt,
  PiggyBank,
  Sun,
  Moon,
  Settings,
  Sparkles
} from 'lucide-react'

export const MainLayout = () => {
  const { theme, toggleTheme } = useTheme()

  const navClass = ({ isActive }) =>
    `nav-link d-flex align-items-center gap-2 ${isActive ? 'active fw-bold' : ''}`

  return (
    <div className='min-vh-100 d-flex flex-column'>
      <nav className='navbar navbar-expand-lg sticky-top py-3'>
        <div className='container'>
          <NavLink
            to='/'
            className='navbar-brand d-flex align-items-center gap-2'
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Sparkles size={20} color='white' />
            </div>
            <span>EXPENSE & BUDGET APP</span>
          </NavLink>

          <button
            className='navbar-toggler border-0'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
          >
            <span className='navbar-toggler-icon' />
          </button>

          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav mx-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <NavLink to='/' end className={navClass}>
                  <LayoutDashboard size={18} /> Dashboard
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/transactions' className={navClass}>
                  <Receipt size={18} /> Transactions
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/budgets' className={navClass}>
                  <PiggyBank size={18} /> Budgets
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/settings' className={navClass}>
                  <Settings size={18} /> Settings
                </NavLink>
              </li>
            </ul>

            <button
              className='btn btn-outline-secondary rounded-circle'
              onClick={toggleTheme}
              aria-label='Toggle Theme'
              style={{ width: '40px', height: '40px', padding: 0 }}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <main className='container py-4 flex-grow-1'>
        <div className='animate-fade-in'>
          <Outlet />
        </div>
      </main>

      <footer className='text-center py-4 text-muted small border-top mt-auto'>
        <div className='container'>
          <p className='mb-0'>
            © 2026 <strong>EXPENSE & BUDGET APP</strong> - by KM to manage your finances efficiently.
          </p>
        </div>
      </footer>
    </div>
  )
}
