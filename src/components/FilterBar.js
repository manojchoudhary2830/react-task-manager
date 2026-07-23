import { CATEGORIES } from '../utils/taskUtils';

function FilterBar({ filters, onChange, visibleCount, onClearCompleted, hasCompletedTasks }) {
  const statuses = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <section className="filters" aria-label="Task filters and sorting">
      <div className="filter-topline">
        <div className="status-tabs" role="group" aria-label="Filter by completion status">
          {statuses.map((status) => (
            <button
              className={filters.status === status.value ? 'active' : ''}
              key={status.value}
              onClick={() => onChange('status', status.value)}
              type="button"
              aria-pressed={filters.status === status.value}
            >
              {status.label}
            </button>
          ))}
        </div>
        <span className="visible-count" aria-live="polite">{visibleCount} shown</span>
      </div>

      <div className="filter-controls">
        <label className="search-field">
          <span className="sr-only">Search tasks</span>
          <span aria-hidden="true" className="search-icon">⌕</span>
          <input
            onChange={(event) => onChange('query', event.target.value)}
            placeholder="Search title or description"
            type="search"
            value={filters.query}
          />
        </label>

        <label className="select-field">
          <span className="sr-only">Filter by category</span>
          <select onChange={(event) => onChange('category', event.target.value)} value={filters.category}>
            <option>All</option>
            {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
          </select>
        </label>

        <label className="select-field">
          <span className="sr-only">Sort tasks</span>
          <select onChange={(event) => onChange('sortBy', event.target.value)} value={filters.sortBy}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="due-date">Due date</option>
            <option value="priority">Priority</option>
            <option value="alphabetical">A–Z</option>
          </select>
        </label>

        {hasCompletedTasks && (
          <button className="text-button" onClick={onClearCompleted} type="button">Clear completed</button>
        )}
      </div>
    </section>
  );
}

export default FilterBar;
