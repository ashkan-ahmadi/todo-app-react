const NewTaskForm = ({
  onSubmit,
  taskTitle,
  taskUrgent,
  setTaskTitle,
  setTaskUrgent,
}) => {
  const handleTitle = (e) => {
    setTaskTitle(e.target.value)
  }

  const handleUrgent = (e) => {
    setTaskUrgent(e.target.checked)
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="To-do title"
        id="title"
        value={taskTitle}
        onChange={handleTitle}
        autoComplete="off"
      />
      <br />
      <input
        type="checkbox"
        id="urgent"
        checked={taskUrgent}
        onChange={handleUrgent}
      />{' '}
      <label htmlFor="urgent">Urgent</label>
      <br />
      <button type="submit">Add to do</button>
    </form>
  )
}

export default NewTaskForm
