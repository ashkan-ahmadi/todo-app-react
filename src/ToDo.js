import { useState, useEffect } from 'react'
import NewTaskForm from './components/AddNewTask'
import PageHeader from './components/PageHeader'
import Tasks from './components/Tasks'
import TaskCounter from './components/TaskCounter'

const ToDo = () => {
  const [tasks, setTasks] = useState([])
  const [taskTitle, setTaskTitle] = useState('')
  const [taskUrgent, setTaskUrgent] = useState(false)

  const addTaskToDatabase = async (taskTitle, taskUrgent) => {
    let request = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ title: taskTitle, urgent: taskUrgent }),
    }).then((res) => res.json())

    console.log(request)
  }

  useEffect(() => {
    const fetchTasksfromDatabase = async () => {
      const dbURL = 'http://localhost:5000/tasks'
      const request = await fetch(dbURL)
      const data = await request.json()
      setTasks(data)
    }

    fetchTasksfromDatabase()
  }, [])

  const handleFormSubmission = (e) => {
    e.preventDefault()

    if (taskTitle) {
      setTasks((prev) =>
        prev.concat({
          id: Math.random(),
          title: taskTitle,
          urgent: taskUrgent,
        })
      )

      addTaskToDatabase(taskTitle, taskUrgent)

      setTaskTitle('')
      setTaskUrgent(false)

      e.target[0].focus()
    } else {
      e.target[0].focus()
    }
  }

  return (
    <>
      <PageHeader text="To Do List" />
      <Tasks tasks={tasks} />
      <TaskCounter tasks={tasks} />
      <NewTaskForm
        onSubmit={handleFormSubmission}
        taskTitle={taskTitle}
        taskUrgent={taskUrgent}
        setTaskTitle={setTaskTitle}
        setTaskUrgent={setTaskUrgent}
      />
    </>
  )
}

export default ToDo
