import { useState, useEffect } from 'react'
import NewTaskForm from './components/AddNewTask'
import PageHeader from './components/PageHeader'
import Tasks from './components/Tasks'
import TaskCounter from './components/TaskCounter'

const ToDo = () => {
  const [tasks, setTasks] = useState([])
  const [taskTitle, setTaskTitle] = useState('')
  const [taskUrgent, setTaskUrgent] = useState(false)

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
      const addTaskToDatabase = async (taskTitle, taskUrgent) => {
        let request = await fetch('http://localhost:5000/tasks', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ title: taskTitle, urgent: taskUrgent }),
        }).then((res) => res.json())
        // return request

        console.log(request.id)

        setTasks((prev) =>
          prev.concat({
            id: request.id,
            title: taskTitle,
            urgent: taskUrgent,
          })
        )

        setTaskTitle('')
        setTaskUrgent(false)
        e.target[0].focus()
      }
      addTaskToDatabase(taskTitle, taskUrgent)
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
        />
        <TaskCounter tasks={tasks} />
        <Tasks tasks={tasks} />
      </div>
    </>
  )
}

export default ToDo
