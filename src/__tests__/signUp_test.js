import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import SignUp from '../signUp/SignUp';
import '@testing-library/jest-dom';

describe('SignUp Component', () => {
  const mockThemeContextValue = {
    theme: 'light',
    toggleTheme: jest.fn(),
  };

  const mockNavigate = jest.fn();

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  beforeEach(() => {
    render(
      <BrowserRouter>
        <ThemeContext.Provider value={mockThemeContextValue}>
          <SignUp />
        </ThemeContext.Provider>
      </BrowserRouter>
    );
  });

  test('alerts if no photo is selected on submission', () => {
    global.alert = jest.fn();

    fireEvent.change(screen.getByLabelText(/Enter User Name/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/Enter Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText(/Submit/i));

    expect(global.alert).toHaveBeenCalledWith('Please select an image.');

    global.alert.mockClear();
  });

  test('alerts if passwords do not match', () => {
    global.alert = jest.fn();

    fireEvent.change(screen.getByLabelText(/Enter User Name/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/Enter Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'differentpassword' },
    });

    fireEvent.click(screen.getByText(/Submit/i));

    expect(global.alert).toHaveBeenCalledWith('Password and Confirm Password must be the same');

    global.alert.mockClear();
  });
});
