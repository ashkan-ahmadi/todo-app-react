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
        consoleError('Something wrong with the DELETE request')
      }

      await fetchTasks()
    } catch (error) {
      consoleError(error)
    }
  }

  const toggleTaskComplete = async (taskid) => {
    setLoading(true)

    try {
      // https://github.com/bradtraversy/react-crash-2021/blob/master/src/App.js#L71
      const currentTaskData = await fetchTask(taskid)
      console.log('current task:', currentTaskData)
      const updatedTask = { ...currentTaskData, complete: !currentTaskData.complete }
      console.log('updated task:', updatedTask)

      const request = await fetch(`http://localhost:5000/tasks/${taskid}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedTask)
      })
      console.log(request)

      await fetchTasks()
    } catch (error) {
      console.error(error);
    }
  }

  const toggleTaskUrgent = async (taskid) => {
    setLoading(true)

    try {
      const currentTaskData = await fetchTask(taskid)
      console.log('current task:', currentTaskData)
      const updatedTask = { ...currentTaskData, urgent: !currentTaskData.urgent }
      console.log('updated task:', updatedTask)

      const request = await fetch(`http://localhost:5000/tasks/${taskid}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedTask)
      })
      console.log(request)

      await fetchTasks()
    } catch (error) {
      console.error(error);
    }
  }


  const consoleError = (err = '') => {
    console.error(`There was a problem with this request. Error: ${err}`)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

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
