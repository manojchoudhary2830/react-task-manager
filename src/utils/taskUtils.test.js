import {
  createTask,
  filterTasks,
  formatDueDate,
  getTaskStats,
  isOverdue,
  sortTasks
} from './taskUtils';

const tasks = [
  {
    id: '1',
    title: 'Write report',
    description: 'React internship report',
    category: 'Work',
    priority: 'High',
    dueDate: '2026-07-20',
    completed: false,
    createdAt: '2026-07-10T10:00:00.000Z'
  },
  {
    id: '2',
    title: 'Buy notebook',
    description: 'A4 ruled notebook',
    category: 'Shopping',
    priority: 'Low',
    dueDate: '2026-07-28',
    completed: true,
    createdAt: '2026-07-12T10:00:00.000Z'
  },
  {
    id: '3',
    title: 'Study hooks',
    description: 'Review useState and useEffect',
    category: 'Learning',
    priority: 'Medium',
    dueDate: '',
    completed: false,
    createdAt: '2026-07-11T10:00:00.000Z'
  }
];

describe('task utilities', () => {
  test('creates a normalized task', () => {
    const task = createTask(
      { title: '  New task ', description: ' Details ', category: 'Work', priority: 'High', dueDate: '' },
      () => 'fixed-id'
    );
    expect(task).toMatchObject({ id: 'fixed-id', title: 'New task', description: 'Details', completed: false });
  });

  test('filters active tasks', () => {
    expect(filterTasks(tasks, { query: '', status: 'active', category: 'All' })).toHaveLength(2);
  });

  test('filters completed tasks', () => {
    expect(filterTasks(tasks, { query: '', status: 'completed', category: 'All' })).toHaveLength(1);
  });

  test('filters by category', () => {
    expect(filterTasks(tasks, { query: '', status: 'all', category: 'Learning' })[0].id).toBe('3');
  });

  test('searches title and description without case sensitivity', () => {
    expect(filterTasks(tasks, { query: 'REACT', status: 'all', category: 'All' }).map((task) => task.id)).toEqual(['1']);
  });

  test('sorts newest tasks first', () => {
    expect(sortTasks(tasks, 'newest').map((task) => task.id)).toEqual(['2', '3', '1']);
  });

  test('sorts oldest tasks first', () => {
    expect(sortTasks(tasks, 'oldest').map((task) => task.id)).toEqual(['1', '3', '2']);
  });

  test('sorts tasks by priority', () => {
    expect(sortTasks(tasks, 'priority').map((task) => task.id)).toEqual(['1', '3', '2']);
  });

  test('puts tasks without a date last in due-date sorting', () => {
    expect(sortTasks(tasks, 'due-date').map((task) => task.id)).toEqual(['1', '2', '3']);
  });

  test('calculates task statistics', () => {
    expect(getTaskStats(tasks)).toEqual({ total: 3, active: 2, completed: 1, completionRate: 33 });
  });

  test('detects an overdue active task', () => {
    expect(isOverdue(tasks[0], new Date('2026-07-21T14:00:00'))).toBe(true);
  });

  test('does not mark completed tasks as overdue', () => {
    const completedOldTask = { ...tasks[0], completed: true };
    expect(isOverdue(completedOldTask, new Date('2026-07-21T14:00:00'))).toBe(false);
  });

  test('formats an ISO date for display', () => {
    expect(formatDueDate('2026-07-20')).toContain('20 Jul 2026');
  });
});
