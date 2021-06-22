import React from 'react'


const FilterTasks = ({ filterCompleteTasks, setFilterCompleteTasks, setStatus }) => {

  const filterTasks = (e) => {
    setStatus(e.target.value)
  }

  return (
    <div className="d-flex justify-content-end">
      <select onChange={filterTasks} className="form-select" aria-label="Default select example">
        <option disabled>View Tasks</option>
        <option value="all" defaultValue>All</option>
        <option value="complete">Completed tasks</option>
        <option value="urgent">Urgent tasks</option>
      </select>
    </div>
  )
}

export default FilterTasks
