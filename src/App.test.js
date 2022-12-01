import { render, screen } from '@testing-library/react';
import App from './App';

test('dummy', () => {
  render(<App />);
  const hey = screen.getByText("Hey!");
  expect(hey).toBeInTheDocument();
});
