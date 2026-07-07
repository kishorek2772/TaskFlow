// src/components/layout/Navbar.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <Link className="navbar-brand fw-bold" to="/dashboard">⚡ TaskFlow</Link>
      <div className="ms-auto d-flex align-items-center gap-3">
        {isAuthenticated ? (
          <>
            <span className="text-secondary small">
              👤 <span className="text-light">{user?.username}</span>
              <span className="badge bg-secondary ms-2">{user?.role}</span>
            </span>
            <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="btn btn-sm btn-outline-light" to="/login">Login</Link>
            <Link className="btn btn-sm btn-primary" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
