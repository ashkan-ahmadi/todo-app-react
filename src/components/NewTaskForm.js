const NewTaskForm = ({
  onSubmit,
  taskTitle,
  taskUrgent,
  setTaskTitle,
  setTaskUrgent,
  loading,
}) => {
  const handleTitle = (e) => {
    setTaskTitle(e.target.value)
  }

  const handleUrgent = (e) => {
    setTaskUrgent(e.target.checked)
  }

  return (
    <form onSubmit={onSubmit} className="mb-3">
      <div className="form-floating mb-3">
        <input
          type="text"
          placeholder="Task name"
          id="title"
          className="form-control"
          value={taskTitle}
          onChange={handleTitle}
          autoComplete="off"
          autoFocus={true}
          disabled={loading}
        />
        <label htmlFor="title">Task name</label>
      </div>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          id="urgent"
          className="form-check-input"
          checked={taskUrgent}
          onChange={handleUrgent}
          disabled={loading}
        />{' '}
        <label htmlFor="urgent" className="form-check-label">
          Urgent?
        </label>
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-lg"
        disabled={loading || !taskTitle.trim()}
      >
        Add to do
      </button>
    </form>
  )
}

export default NewTaskForm
