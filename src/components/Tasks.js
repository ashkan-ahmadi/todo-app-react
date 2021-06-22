import React, { useState, useEffect } from 'react'
import FilterTasks from './FilterTasks'
import TaskCounter from './TaskCounter'
import Task from './Task'

const Tasks = ({ tasks, deleteTask, toggleTaskComplete, toggleTaskUrgent }) => {
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])

  useEffect(() => {
    filterHandler()
  }, [tasks, status])

  const filterHandler = () => {
    switch (status) {
      case 'complete':
        setFilteredTodos(tasks.filter(task => task.complete === true))
        break
      case 'urgent':
        setFilteredTodos(tasks.filter(task => task.urgent === true))
        break
      default:
        setFilteredTodos(tasks)
    }
  }


  return (
    <>
      <FilterTasks setStatus={setStatus} />
      <TaskCounter tasks={tasks} />
      <ul className="p-0">
        {filteredTodos.map((task) => (
          <Task
            task={task}
            key={task.id}
            deleteTask={deleteTask}
            toggleTaskComplete={toggleTaskComplete}
            toggleTaskUrgent={toggleTaskUrgent}
          />
        ))}
      </ul>
    </>
  )
}

export default Tasks
