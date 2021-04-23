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
    const dbURL = 'http://localhost:5000/tasks?_sort=id&_order=desc'
    const request = await fetch(dbURL)
    const data = await request.json()
    setTasks(data)
    // setTimeout(() => {
    setLoading(false)
    // }, 1000)
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

  useEffect(() => {
    fetchTasksfromDatabase()
  }, [])

  const handleFormSubmission = (e) => {
    e.preventDefault()

    if (taskTitle) {
      setLoading(true) // fetchTasksfromDatabase() wll set it to false when it's done

      addTaskToDatabase(taskTitle, taskUrgent).then((res) => {
        if (res.id) {
          fetchTasksfromDatabase()
        }
      })

      setTaskTitle('')
      setTaskUrgent(false)

      /*       addTaskToDatabase(taskTitle, taskUrgent).then((res) => {
        if (res.id) {
          fetchTasksfromDatabase()
        }
      }) */
      e.target[0].focus()
    } else {
      e.target[0].focus()
    }
  }

  return (
    <>
      <div className="container mt-3">
        <PageHeader text="To Do List" />
        <NewTaskForm
          onSubmit={handleFormSubmission}
          taskTitle={taskTitle}
          taskUrgent={taskUrgent}
          setTaskTitle={setTaskTitle}
          setTaskUrgent={setTaskUrgent}
          loading={loading}
        />
        <TaskCounter tasks={tasks} />
        {loading ? <Loading /> : <Tasks tasks={tasks} />}
      </div>
    </>
  )
}

export default ToDo
