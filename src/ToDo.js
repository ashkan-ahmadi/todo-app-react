import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NewTaskForm from './components/NewTaskForm'
import PageHeader from './components/PageHeader'
import Tasks from './components/Tasks'
import './spinkit.css'

const ToDo = () => {
  const [tasks, setTasks] = useState([])
  const [taskTitle, setTaskTitle] = useState('')
  const [taskUrgent, setTaskUrgent] = useState(false)
  const [taskComplete, setTaskComplete] = useState(false)
  const [userId, setUserId] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    const request = await fetch(
      'http://localhost:5000/tasks?_sort=id&_order=desc'
    )
    const data = await request.json()
    setTasks(data)
    setLoading(false)
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  const addTask = async () => {
    let request = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title: taskTitle,
        urgent: taskUrgent,
        userId: userId,
        complete: taskComplete
      }),
    }).then((res) => res.json())
    return request
  }

  const deleteTask = async (taskid) => {
    setLoading(true)
    try {
      const request = await fetch(`http://localhost:5000/tasks/${taskid}`, {
        method: 'DELETE',
      })

      if (!request.ok) {
        toast.error('Something wrong! Could not delete task!')
        consoleError('Something wrong! Could not delete task!')
      }

      await fetchTasks()
      toast.success('Task deleted successfully!')
    } catch (error) {
      toast.error('Oops! Something went wrong with the DELETE request!')
      consoleError(error)
    }
  }

  const toggleTaskComplete = async (taskid) => {
    setLoading(true)

    try {
      const currentTaskData = await fetchTask(taskid)
      const updatedTask = { ...currentTaskData, complete: !currentTaskData.complete }

      const request = await fetch(`http://localhost:5000/tasks/${taskid}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedTask)
      })

      await fetchTasks()
    } catch (error) {
      console.error(error);
    }
  }

  const toggleTaskUrgent = async (taskid) => {
    setLoading(true)

    try {
      const currentTaskData = await fetchTask(taskid)
      const updatedTask = { ...currentTaskData, urgent: !currentTaskData.urgent }

      const request = await fetch(`http://localhost:5000/tasks/${taskid}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedTask)
      })

      await fetchTasks()
    } catch (error) {
      toast.error(`Oops! There was an error: ${error}`)
      console.error(error);
    }
  }

  const consoleError = (err = '') => {
    console.error(`There was a problem with this request. Error: ${err}`)
  }

  const formSubmission = async (e) => {
    e.preventDefault()

    if (!taskTitle) {
      e.target[0].focus()
      return
    }

    setLoading(true)

    try {
      const newTaskResponse = await addTask(taskTitle, taskUrgent)

      if (!newTaskResponse) {
        consoleError(
          'newTaskResponse inside formSubmission did not receive a response back from the server.'
        )
        e.target[0].focus()
        return
      }
      toast.success('✔️ Task added successfully')
      await fetchTasks()

      setTaskTitle('')
      setTaskUrgent(false)
      e.target[0].focus()
    } catch (error) {
      consoleError()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover />
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
        <Tasks
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTaskComplete={toggleTaskComplete}
          toggleTaskUrgent={toggleTaskUrgent}
        />
      </div>
    </>
  )
}

export default ToDo
