import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { STORAGE_KEY } from './hooks/useTasks';

beforeEach(() => {
  localStorage.clear();
});

test('renders the dashboard and starter tasks', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /make today count/i })).toBeInTheDocument();
  expect(screen.getByText(/review react component architecture/i)).toBeInTheDocument();
});

test('adds a task and persists it to Local Storage', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /new task/i }));
  fireEvent.change(screen.getByLabelText(/task title/i), { target: { value: 'Submit React assignment' } });
  fireEvent.click(screen.getByRole('button', { name: /^add task$/i }));

  expect(screen.getByText('Submit React assignment')).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).some((task) => task.title === 'Submit React assignment')).toBe(true);
});

test('shows validation feedback for an empty task title', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /new task/i }));
  fireEvent.click(screen.getByRole('button', { name: /^add task$/i }));
  expect(screen.getByRole('alert')).toHaveTextContent(/please enter a task title/i);
});

test('filters completed tasks', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Completed' }));
  expect(screen.getByText(/set up the react development environment/i)).toBeInTheDocument();
  expect(screen.queryByText(/review react component architecture/i)).not.toBeInTheDocument();
});
