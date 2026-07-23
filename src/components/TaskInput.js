import { useEffect, useRef, useState } from 'react';
import { CATEGORIES, PRIORITIES } from '../utils/taskUtils';

const emptyForm = {
  title: '',
  description: '',
  category: 'Work',
  priority: 'Medium',
  dueDate: ''
};

function TaskInput({ editingTask, isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const titleRef = useRef(null);

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description,
        category: editingTask.category,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate
      });
    } else {
      setForm(emptyForm);
    }
    setError('');
  }, [editingTask, isOpen]);

  useEffect(() => {
    if (isOpen) titleRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const changeField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (name === 'title' && value.trim()) setError('');
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (!form.title.trim()) {
      setError('Please enter a task title.');
      titleRef.current?.focus();
      return;
    }
    onSubmit(form);
    setForm(emptyForm);
  };

  return (
    <section className="task-form-panel" aria-labelledby="task-form-title">
      <div className="form-heading">
        <div>
          <p className="eyebrow">{editingTask ? 'UPDATE TASK' : 'CREATE TASK'}</p>
          <h2 id="task-form-title">{editingTask ? 'Edit your task' : 'What needs your attention?'}</h2>
        </div>
        <button className="icon-button" onClick={onClose} type="button" aria-label="Close task form">
          ×
        </button>
      </div>

      <form onSubmit={submitForm} noValidate>
        <div className="field full-field">
          <label htmlFor="task-title">Task title <span aria-hidden="true">*</span></label>
          <input
            id="task-title"
            name="title"
            onChange={changeField}
            placeholder="e.g. Prepare the React project presentation"
            ref={titleRef}
            value={form.title}
            aria-describedby={error ? 'title-error' : undefined}
            aria-invalid={Boolean(error)}
            maxLength="100"
          />
          {error && <span className="field-error" id="title-error" role="alert">{error}</span>}
        </div>

        <div className="field full-field">
          <label htmlFor="task-description">Description <span className="optional">Optional</span></label>
          <textarea
            id="task-description"
            name="description"
            onChange={changeField}
            placeholder="Add useful details or acceptance criteria"
            rows="3"
            value={form.description}
            maxLength="260"
          />
        </div>

        <div className="form-grid">
          <div className="field">
            <label htmlFor="task-category">Category</label>
            <select id="task-category" name="category" onChange={changeField} value={form.category}>
              {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="task-priority">Priority</label>
            <select id="task-priority" name="priority" onChange={changeField} value={form.priority}>
              {PRIORITIES.map((priority) => <option key={priority}>{priority}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="task-due-date">Due date</label>
            <input id="task-due-date" name="dueDate" onChange={changeField} type="date" value={form.dueDate} />
          </div>
        </div>

        <div className="form-actions">
          <button className="secondary-button" onClick={onClose} type="button">Cancel</button>
          <button className="primary-button" type="submit">
            {editingTask ? 'Save changes' : 'Add task'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default TaskInput;
