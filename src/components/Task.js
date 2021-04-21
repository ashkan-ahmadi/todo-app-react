import Urgent from './Urgent'

const Task = ({ task }) => {
  return (
    <li key={task.id}>
      {task.title}
      {task.urgent ? <Urgent /> : ''}
    </li>
  )
}

export default Task
