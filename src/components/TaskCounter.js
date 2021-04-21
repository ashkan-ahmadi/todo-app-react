const TaskCounter = ({ tasks }) => {
  return (
    <p>
      You have {tasks.length} {tasks.length > 1 && 'tasks to do'}
      {tasks.length === 0 && 'tasks. Add a new task'}
      {tasks.length === 1 && 'task to do'}.
    </p>
  )
}

export default TaskCounter
