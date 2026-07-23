export const CATEGORIES = ['Work', 'Personal', 'Learning', 'Shopping', 'Other'];
export const PRIORITIES = ['High', 'Medium', 'Low'];

export const createTask = (values, idFactory = () => `${Date.now()}-${Math.random()}`) => {
  const now = new Date().toISOString();
  return {
    id: idFactory(),
    title: values.title.trim(),
    description: values.description.trim(),
    category: values.category,
    priority: values.priority,
    dueDate: values.dueDate,
    completed: false,
    createdAt: now,
    updatedAt: now
  };
};

export const filterTasks = (tasks, filters) => {
  const query = filters.query.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesStatus =
      filters.status === 'all' ||
      (filters.status === 'active' && !task.completed) ||
      (filters.status === 'completed' && task.completed);
    const matchesCategory = filters.category === 'All' || task.category === filters.category;
    const matchesQuery =
      !query ||
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query);

    return matchesStatus && matchesCategory && matchesQuery;
  });
};

const priorityRank = { High: 1, Medium: 2, Low: 3 };

export const sortTasks = (tasks, sortBy) => {
  const result = [...tasks];

  switch (sortBy) {
    case 'oldest':
      return result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    case 'due-date':
      return result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      });
    case 'priority':
      return result.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
    case 'alphabetical':
      return result.sort((a, b) => a.title.localeCompare(b.title));
    case 'newest':
    default:
      return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};

export const getTaskStats = (tasks) => {
  const completed = tasks.filter((task) => task.completed).length;
  const active = tasks.length - completed;
  const completionRate = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  return { total: tasks.length, active, completed, completionRate };
};

export const isOverdue = (task, today = new Date()) => {
  if (!task.dueDate || task.completed) return false;
  const localToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const dueDate = new Date(`${task.dueDate}T00:00:00`);
  return dueDate < localToday;
};

export const formatDueDate = (dateValue) => {
  if (!dateValue) return 'No due date';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(`${dateValue}T00:00:00`));
};
