// src/pages/RegisterPage.jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const RegisterPage = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '420px' }}>
        <h3 className="text-center fw-bold mb-1">Create Account</h3>
        <p className="text-center text-muted mb-4 small">Join TaskFlow today</p>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input type="text" className="form-control" name="username"
              value={form.username} onChange={handleChange} placeholder="johndoe" required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input type="email" className="form-control" name="email"
              value={form.email} onChange={handleChange} placeholder="you@example.com" required />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input type="password" className="form-control" name="password"
              value={form.password} onChange={handleChange} placeholder="Min. 6 characters" minLength={6} required />
          </div>
          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-3 mb-0 small">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
