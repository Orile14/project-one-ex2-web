import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../signUp/SignUp';
import { ThemeContext } from '../ThemeContext/ThemeContext';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('SignUp Component', () => {
  test('shows an error if passwords do not match', () => {
    const mockThemeContextValue = {
      theme: 'light',
      toggleTheme: jest.fn(),
    };

    render(
      <BrowserRouter>
        <ThemeContext.Provider value={mockThemeContextValue}>
          <SignUp />
        </ThemeContext.Provider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Enter User Name/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/Enter Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'differentpassword' },
    });

    global.alert = jest.fn();

    fireEvent.click(screen.getByText(/Submit/i));

    expect(global.alert).toHaveBeenCalledWith('Password and Confirm Password must be the same');
  });
});
