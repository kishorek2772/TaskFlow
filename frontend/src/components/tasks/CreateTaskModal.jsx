// src/components/tasks/CreateTaskModal.jsx
import React, { useState } from 'react'

const CreateTaskModal = ({ projectId, onClose, onCreate }) => {
  const [form, setForm] = useState({
    title: '', description: '', status: 'TODO',
    priority: 'MEDIUM', assignedTo: '', projectId,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await onCreate(form)
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">New Task</h5>
            <button className="btn-close" onClick={onClose} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <div className="mb-3">
                <label className="form-label fw-semibold">Title *</label>
                <input type="text" className="form-control" name="title"
                  value={form.title} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea className="form-control" name="description" rows={2}
                  value={form.description} onChange={handleChange} />
              </div>
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label fw-semibold">Priority</label>
                  <select className="form-select" name="priority" value={form.priority} onChange={handleChange}>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label fw-semibold">Status</label>
                  <select className="form-select" name="status" value={form.status} onChange={handleChange}>
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                  </select>
                </div>
              </div>
              <div className="mb-2">
                <label className="form-label fw-semibold">Assigned To *</label>
                <input type="text" className="form-control" name="assignedTo"
                  value={form.assignedTo} onChange={handleChange} placeholder="username" required />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating...' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateTaskModal
