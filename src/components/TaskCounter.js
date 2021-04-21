const TaskCounter = ({ tasks }) => {
  return (
    <p>
      You have {tasks.length} {tasks.length > 1 && 'tasks'}
      {tasks.length === 0 && 'tasks. Add a new task'}
      {tasks.length === 1 && 'task'}.
    </p>
  )
}

export default TaskCounter
