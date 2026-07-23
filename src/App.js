import { useMemo, useState } from 'react';
import './App.css';
import FilterBar from './components/FilterBar';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Toast from './components/Toast';
import { useTasks } from './hooks/useTasks';
import { filterTasks, getTaskStats, sortTasks } from './utils/taskUtils';

const initialFilters = {
  query: '',
  status: 'all',
  category: 'All',
  sortBy: 'newest'
};

function App() {
  const { tasks, addTask, updateTask, toggleTask, deleteTask, clearCompleted } = useTasks();
  const [filters, setFilters] = useState(initialFilters);
  const [editingTask, setEditingTask] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [toast, setToast] = useState('');

  const stats = useMemo(() => getTaskStats(tasks), [tasks]);
  const visibleTasks = useMemo(
    () => sortTasks(filterTasks(tasks, filters), filters.sortBy),
    [tasks, filters]
  );

  const openNewTaskForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
    window.setTimeout(() => document.getElementById('task-form-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 0);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
    window.setTimeout(() => document.getElementById('task-form-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 0);
  };

  const submitTask = (values) => {
    if (editingTask) {
      updateTask(editingTask.id, values);
      setToast('Task updated successfully');
    } else {
      addTask(values);
      setToast('New task added');
    }
    setEditingTask(null);
    setIsFormOpen(false);
  };

  const removeTask = (taskId) => {
    deleteTask(taskId);
    setToast('Task deleted');
  };

  const handleFilterChange = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#task-list-heading">Skip to task list</a>
      <Header onOpenForm={openNewTaskForm} />

      <main className="page-content">
        <section className="intro-row">
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h2>Make today count.</h2>
            <p>Capture priorities, organise your work, and finish with clarity.</p>
          </div>
          <button className="primary-button mobile-add" onClick={openNewTaskForm} type="button">＋ Add task</button>
        </section>

        <StatsBar stats={stats} />

        <TaskInput
          editingTask={editingTask}
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
          onSubmit={submitTask}
        />

        <section className="tasks-section" id="task-list-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">TASKS</p>
              <h2>Plan and progress</h2>
            </div>
          </div>

          <FilterBar
            filters={filters}
            hasCompletedTasks={stats.completed > 0}
            onChange={handleFilterChange}
            onClearCompleted={() => {
              clearCompleted();
              setToast('Completed tasks cleared');
            }}
            visibleCount={visibleTasks.length}
          />

          <TaskList
            hasAnyTasks={tasks.length > 0}
            onAddTask={openNewTaskForm}
            onDelete={removeTask}
            onEdit={openEditForm}
            onToggle={toggleTask}
            tasks={visibleTasks}
          />
        </section>
      </main>

      <footer>
        <span>Momentum Task Manager</span>
        <span>Built with React hooks and Local Storage</span>
      </footer>
      <Toast message={toast} onDismiss={() => setToast('')} />
    </div>
  );
}

export default App;
