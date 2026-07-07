// src/pages/LoginPage.jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '420px' }}>
        <h3 className="text-center fw-bold mb-1">Welcome back ⚡</h3>
        <p className="text-center text-muted mb-4 small">Login to your TaskFlow account</p>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input type="email" className="form-control" name="email"
              value={form.email} onChange={handleChange} placeholder="you@example.com" required />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input type="password" className="form-control" name="password"
              value={form.password} onChange={handleChange} placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-3 mb-0 small">
          No account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
