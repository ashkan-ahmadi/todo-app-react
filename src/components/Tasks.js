import Task from './Task'

const Tasks = ({ tasks, deleteTaskFromDatabase }) => {
  return (
    <ul className="p-0">
      {tasks.map((task) => (
        <Task
          task={task}
          key={task.id}
          deleteTaskFromDatabase={deleteTaskFromDatabase}
        />
      ))}
    </ul>
  )
}

export default Tasks
