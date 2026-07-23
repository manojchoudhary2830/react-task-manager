import { formatDueDate, isOverdue } from '../utils/taskUtils';

function TaskItem({ task, onDelete, onEdit, onToggle }) {
  const overdue = isOverdue(task);

  return (
    <article className={`task-card ${task.completed ? 'completed' : ''}`}>
      <label className="task-checkbox">
        <input
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          type="checkbox"
          aria-label={`Mark ${task.title} as ${task.completed ? 'active' : 'completed'}`}
        />
        <span aria-hidden="true">✓</span>
      </label>

      <div className="task-content">
        <div className="task-title-row">
          <h3>{task.title}</h3>
          <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
        </div>
        {task.description && <p>{task.description}</p>}
        <div className="task-meta">
          <span className="category-badge">{task.category}</span>
          <span className={overdue ? 'due-date overdue' : 'due-date'}>
            <span aria-hidden="true">◷</span> {overdue ? 'Overdue · ' : ''}{formatDueDate(task.dueDate)}
          </span>
        </div>
      </div>

      <div className="task-actions" aria-label={`Actions for ${task.title}`}>
        <button onClick={() => onEdit(task)} type="button" aria-label={`Edit ${task.title}`}>Edit</button>
        <button className="delete-action" onClick={() => onDelete(task.id)} type="button" aria-label={`Delete ${task.title}`}>Delete</button>
      </div>
    </article>
  );
}

export default TaskItem;
