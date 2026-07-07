// src/components/tasks/TaskCard.jsx
import React from 'react'

const priorityColor = {
  LOW: 'bg-success',
  MEDIUM: 'bg-warning text-dark',
  HIGH: 'bg-danger',
}

const TaskCard = ({ task, onStatusChange, onDelete }) => {
  return (
    <div className="card mb-2 shadow-sm border-0">
      <div className="card-body py-2 px-3">
        <div className="d-flex justify-content-between align-items-start mb-1">
          <span className="fw-semibold small">{task.title}</span>
          <span className={`badge ${priorityColor[task.priority]}`}>{task.priority}</span>
        </div>
        {task.description && (
          <p className="text-muted mb-1" style={{ fontSize: '0.78rem' }}>{task.description}</p>
        )}
        <p className="mb-2" style={{ fontSize: '0.78rem' }}>
          <span className="text-muted">Assigned: </span>
          <strong>{task.assignedTo || '—'}</strong>
        </p>
        <div className="d-flex gap-1 flex-wrap">
          {task.status !== 'TODO' && (
            <button className="btn btn-outline-secondary btn-sm py-0 px-2" style={{ fontSize: '0.72rem' }}
              onClick={() => onStatusChange(task.id, 'TODO')}>← Todo</button>
          )}
          {task.status !== 'IN_PROGRESS' && (
            <button className="btn btn-outline-primary btn-sm py-0 px-2" style={{ fontSize: '0.72rem' }}
              onClick={() => onStatusChange(task.id, 'IN_PROGRESS')}>In Progress</button>
          )}
          {task.status !== 'DONE' && (
            <button className="btn btn-outline-success btn-sm py-0 px-2" style={{ fontSize: '0.72rem' }}
              onClick={() => onStatusChange(task.id, 'DONE')}>Done ✓</button>
          )}
          <button className="btn btn-outline-danger btn-sm py-0 px-2 ms-auto" style={{ fontSize: '0.72rem' }}
            onClick={() => onDelete(task.id)}>✕</button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
