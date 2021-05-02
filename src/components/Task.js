import Button from "./Button"

const Task = ({ task, deleteTask, toggleTaskComplete, toggleTaskUrgent }) => {
  return (
    <li key={task.id} className={`task ${task.urgent ? 'task--urgent' : ''} ${task.complete ? 'task--complete' : ''}`}>
      <div className="d-flex justify-content-between align-items-center">
        <span>{task.title}</span>
        <div>
          <Button
            text={`Mark ${task.complete ? 'Incomplete' : 'Complete'}`}
            className={`me-2 btn-sm ${task.complete ? 'btn-outline-primary' : 'btn-primary'}`}
            onClick={() => {
              toggleTaskComplete(task.id)
            }}
          />
          <Button
            text={`Mark ${task.urgent ? 'Not urgent' : 'Urgent'}`}
            className={`me-2 btn-sm ${task.urgent ? 'btn-outline-success' : 'btn-success'}`}
            task={task}
            onClick={() => {
              toggleTaskUrgent(task.id)
            }}
          />
          <Button
            text="DELETE"
            className='btn-outline-danger btn-sm'
            task={task}
            onClick={() => {
              deleteTask(task.id)
            }}
          />
        </div>
      </div>
    </li>
  )
}

export default Task
