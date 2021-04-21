import Task from './Task'

const Tasks = ({ tasks }) => {
  return (
    <ul style={{ backgroundColor: '#eee' }}>
      {tasks.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </ul>
  )
}

export default Tasks
