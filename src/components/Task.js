const Task = ({ task }) => {
  return (
    <li
      key={task.id}
      className={`task ${task.urgent ? 'task--urgent' : 'task--not-urgent'}`}
    >
      {task.title}
    </li>
  )
}

export default Task
