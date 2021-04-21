const Task = ({ task }) => {
  return (
    <li
      key={task.id}
      className={task.urgent ? 'task task--urgent' : 'task task--not-urgent'}
    >
      {task.title}
    </li>
  )
}

export default Task
