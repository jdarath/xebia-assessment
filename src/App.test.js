import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders main header', () => {
  render(<App />);
  const titleElement = screen.getByText(/Related Topics/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders main topics wrapper', () => {
  const { container } = render(<App />);
  const mainWrapper = container.getElementsByClassName('main-wrapper');
  expect(mainWrapper.length).toBe(1);
});