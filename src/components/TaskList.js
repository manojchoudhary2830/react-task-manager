import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onEdit, onToggle, hasAnyTasks, onAddTask }) {
  if (!tasks.length) {
    return (
      <section className="empty-state">
        <div className="empty-icon" aria-hidden="true">✓</div>
        <h2>{hasAnyTasks ? 'No tasks match these filters' : 'Your task list is clear'}</h2>
        <p>{hasAnyTasks ? 'Try another search, category, or status.' : 'Add your first task and start building momentum.'}</p>
        {!hasAnyTasks && <button className="primary-button" onClick={onAddTask} type="button">Create first task</button>}
      </section>
    );
  }

  return (
    <section className="task-list" aria-label="Tasks">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </section>
  );
}

export default TaskList;
