const dateFromToday = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

export const STARTER_TASKS = [
  {
    id: 'starter-1',
    title: 'Review React component architecture',
    description: 'Draw the component tree and revise how props flow from App to task items.',
    category: 'Learning',
    priority: 'High',
    dueDate: dateFromToday(1),
    completed: false,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString()
  },
  {
    id: 'starter-2',
    title: 'Complete internship weekly update',
    description: 'Summarise progress, testing evidence, and the next development milestone.',
    category: 'Work',
    priority: 'Medium',
    dueDate: dateFromToday(3),
    completed: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'starter-3',
    title: 'Set up the React development environment',
    description: 'Install Node.js, verify npm, and run the application locally.',
    category: 'Personal',
    priority: 'Low',
    dueDate: dateFromToday(-1),
    completed: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString()
  }
];
