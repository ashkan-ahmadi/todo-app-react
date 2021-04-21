import Task from './Task'

const Tasks = ({ tasks }) => {
  return (
    <ul className="p-0">
      {tasks.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </ul>
  )
}

export default Tasks
