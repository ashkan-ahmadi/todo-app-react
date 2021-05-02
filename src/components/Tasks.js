import Task from './Task'

const Tasks = ({ tasks, deleteTask, toggleTaskComplete, toggleTaskUrgent }) => {
  return (
    <ul className="p-0">
      {tasks.map((task) => (
        <Task
          task={task}
          key={task.id}
          deleteTask={deleteTask}
          toggleTaskComplete={toggleTaskComplete}
          toggleTaskUrgent={toggleTaskUrgent}
        />
      ))}
    </ul>
  )
}

export default Tasks
