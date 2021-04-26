import { useState, useEffect } from 'react'
import NewTaskForm from './components/NewTaskForm'
import PageHeader from './components/PageHeader'
import Tasks from './components/Tasks'
import TaskCounter from './components/TaskCounter'
import Loading from './components/Loading'
import './spinkit.css'

const ToDo = () => {
  const [tasks, setTasks] = useState([])
  const [taskTitle, setTaskTitle] = useState('')
  const [taskUrgent, setTaskUrgent] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchTasksfromDatabase = async () => {
    const request = await fetch(
      'http://localhost:5000/tasks?_sort=id&_order=desc'
    )
    const data = await request.json()
    setTasks(data)
    setLoading(false)
  }

  const addTaskToDatabase = async (taskTitle, taskUrgent) => {
    let request = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ title: taskTitle, urgent: taskUrgent }),
    }).then((res) => res.json())
    return request
  }

  const deleteTaskFromDatabase = async (taskid) => {
    setLoading(true)
    try {
      const request = await fetch(`http://localhost:5000/tasks/${taskid}`, {
        method: 'DELETE',
      })

      if (!request.ok) {
        consoleError('Something wrong with the DELETE request')
      }

      await fetchTasksfromDatabase()
    } catch (error) {
      consoleError(error)
    }
  }

  const consoleError = (err = '') => {
    console.error(`There was a problem with this request. Error: ${err}`)
  }

  useEffect(() => {
    fetchTasksfromDatabase()
  }, [])

  const formSubmission = async (e) => {
    e.preventDefault()

    if (!taskTitle) {
      e.target[0].focus()
      return
    }

    setLoading(true)

    try {
      const newTaskResponse = await addTaskToDatabase(taskTitle, taskUrgent)

      if (!newTaskResponse) {
        consoleError(
          'newTaskResponse inside formSubmission did not receive a response back from the server.'
        )
        e.target[0].focus()
        return
      }

      await fetchTasksfromDatabase()

      setTaskTitle('')
      setTaskUrgent(false)
      e.target[0].focus()
    } catch (error) {
      consoleError()
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="container mt-3">
        <PageHeader text="To Do List" />
        <NewTaskForm
          onSubmit={formSubmission}
          taskTitle={taskTitle}
          taskUrgent={taskUrgent}
          setTaskTitle={setTaskTitle}
          setTaskUrgent={setTaskUrgent}
          loading={loading}
        />
        <TaskCounter tasks={tasks} />
        {loading ? (
          <Loading />
        ) : (
          <Tasks
            tasks={tasks}
            deleteTaskFromDatabase={deleteTaskFromDatabase}
          />
        )}
      </div>
    </>
  )
}

export default ToDo
