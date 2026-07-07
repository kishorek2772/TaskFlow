// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react'
import { getAllProjectsApi, createProjectApi, deleteProjectApi } from '../api/projectApi'
import { getAllTasksApi, createTaskApi, updateTaskStatusApi, deleteTaskApi } from '../api/taskApi'
import TaskBoard from '../components/tasks/TaskBoard'
import CreateTaskModal from '../components/tasks/CreateTaskModal'

const DashboardPage = () => {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [loadingTasks, setLoadingTasks] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { fetchProjects() }, [])

  useEffect(() => {
    if (selectedProject) fetchTasks(selectedProject.id)
  }, [selectedProject])

  const fetchProjects = async () => {
    setLoadingProjects(true)
    try {
      const data = await getAllProjectsApi()
      setProjects(data)
      if (data.length > 0) setSelectedProject(data[0])
    } catch {
      setError('Failed to load projects.')
    } finally {
      setLoadingProjects(false)
    }
  }

  const fetchTasks = async (projectId) => {
    setLoadingTasks(true)
    try {
      const data = await getAllTasksApi(projectId)
      setTasks(data)
    } catch {
      setError('Failed to load tasks.')
    } finally {
      setLoadingTasks(false)
    }
  }

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return
    try {
      const created = await createProjectApi({ name: newProjectName, description: '' })
      setProjects(prev => [...prev, created])
      setSelectedProject(created)
      setNewProjectName('')
    } catch {
      setError('Failed to create project.')
    }
  }

  const handleCreateTask = async (data) => {
    const created = await createTaskApi(data)
    setTasks(prev => [...prev, created])
  }

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await updateTaskStatusApi(id, status)
      setTasks(prev => prev.map(t => t.id === id ? updated : t))
    } catch {
      setError('Failed to update task.')
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await deleteTaskApi(id)
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch {
      setError('Failed to delete task.')
    }
  }

  const handleDeleteProject = async (id) => {
    try {
      await deleteProjectApi(id)
      const updated = projects.filter(p => p.id !== id)
      setProjects(updated)
      setSelectedProject(updated[0] || null)
      setTasks([])
    } catch {
      setError('Failed to delete project.')
    }
  }

  return (
    <div className="container-fluid px-3 py-3">
      <div className="row g-3">

        {/* Sidebar */}
        <div className="col-md-3 col-lg-2">
          <div className="card shadow-sm mb-3">
            <div className="card-header bg-dark text-white fw-bold small">📁 Projects</div>
            <div className="card-body p-2">
              {loadingProjects ? (
                <div className="text-center py-2">
                  <div className="spinner-border spinner-border-sm text-primary" />
                </div>
              ) : projects.length === 0 ? (
                <p className="text-muted small text-center mt-2">No projects yet</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {projects.map(p => (
                    <li key={p.id}
                      className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center px-2 py-2 ${selectedProject?.id === p.id ? 'active' : ''}`}
                      style={{ cursor: 'pointer', fontSize: '0.85rem' }}
                      onClick={() => setSelectedProject(p)}
                    >
                      <span className="text-truncate">{p.name}</span>
                      <button
                        className={`btn btn-sm py-0 px-1 ${selectedProject?.id === p.id ? 'btn-outline-light' : 'btn-outline-danger'}`}
                        style={{ fontSize: '0.7rem' }}
                        onClick={e => { e.stopPropagation(); handleDeleteProject(p.id) }}
                      >✕</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Add project */}
          <div className="card shadow-sm">
            <div className="card-body p-2">
              <input
                type="text"
                className="form-control form-control-sm mb-2"
                placeholder="New project name"
                value={newProjectName}
                onChange={e => setNewProjectName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCreateProject()}
              />
              <button className="btn btn-sm btn-primary w-100" onClick={handleCreateProject} disabled={!newProjectName.trim()}>
                + Add Project
              </button>
            </div>
          </div>
        </div>

        {/* Main board */}
        <div className="col-md-9 col-lg-10">
          {error && (
            <div className="alert alert-warning alert-dismissible py-2 mb-3">
              {error}
              <button className="btn-close" onClick={() => setError('')} />
            </div>
          )}

          {selectedProject ? (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-bold mb-0">{selectedProject.name}</h5>
                  <small className="text-muted">{tasks.length} task{tasks.length !== 1 ? 's' : ''}</small>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => setShowTaskModal(true)}>
                  + New Task
                </button>
              </div>

              {loadingTasks ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" />
                </div>
              ) : (
                <TaskBoard tasks={tasks} onStatusChange={handleStatusChange} onDelete={handleDeleteTask} />
              )}
            </>
          ) : (
            <div className="text-center py-5 text-muted">
              <h5>No project selected</h5>
              <p>Create a project from the sidebar to get started.</p>
            </div>
          )}
        </div>
      </div>

      {showTaskModal && selectedProject && (
        <CreateTaskModal
          projectId={selectedProject.id}
          onClose={() => setShowTaskModal(false)}
          onCreate={handleCreateTask}
        />
      )}
    </div>
  )
}

export default DashboardPage
