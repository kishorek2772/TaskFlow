// src/components/tasks/TaskBoard.jsx
import React from 'react'
import TaskCard from './TaskCard'

const columns = [
  { label: '📋 To Do',       status: 'TODO',        accent: 'border-secondary' },
  { label: '🔄 In Progress', status: 'IN_PROGRESS', accent: 'border-primary'   },
  { label: '✅ Done',        status: 'DONE',        accent: 'border-success'   },
]

const TaskBoard = ({ tasks, onStatusChange, onDelete }) => {
  const byStatus = (s) => tasks.filter(t => t.status === s)

  return (
    <div className="row g-3">
      {columns.map(col => (
        <div className="col-md-4" key={col.status}>
          <div className={`card border-top border-3 ${col.accent} h-100 shadow-sm`}>
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
              <span className="fw-bold small">{col.label}</span>
              <span className="badge bg-secondary">{byStatus(col.status).length}</span>
            </div>
            <div className="card-body p-2" style={{ overflowY: 'auto', maxHeight: '65vh' }}>
              {byStatus(col.status).length === 0
                ? <p className="text-muted text-center small mt-4">No tasks</p>
                : byStatus(col.status).map(task => (
                    <TaskCard key={task.id} task={task}
                      onStatusChange={onStatusChange} onDelete={onDelete} />
                  ))
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskBoard
