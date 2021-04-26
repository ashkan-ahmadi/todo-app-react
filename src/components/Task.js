const Task = ({ task, deleteTaskFromDatabase }) => {
  return (
    <li
      key={task.id}
      className={`task ${task.urgent ? 'task--urgent' : 'task--not-urgent'}`}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
        }}
      >
        <span>{task.title}</span>
        <button
          className="btn btn-danger d-block"
          onClick={() => {
            deleteTaskFromDatabase(task.id)
          }}
        >
          DELETE
        </button>
      </div>
    </li>
  )
}

export default Task
