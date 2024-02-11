import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../login/Login';
import User from '../signUp/user';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import '@testing-library/jest-dom';

describe('Login Component', () => {
  const mockThemeContextValue = {
    theme: 'light',
    toggleTheme: jest.fn(),
  };

  beforeEach(() => {
    User.allUsers = [
      new User('admin', 'admin', 'admin_image.jpg') // Ensure admin user is also included
    ];
  });

  test('Login functionality with both invalid and valid credentials', () => {
    // Test with Invalid Credentials
    render(
      <BrowserRouter>
        <ThemeContext.Provider value={mockThemeContextValue}>
          <Login />
        </ThemeContext.Provider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'wronguser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByText(/Login/i));
    expect(screen.getByText(/Invalid email or password. Please try again./i)).toBeInTheDocument();

    // Test with Valid Credentials
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'admin' },
    });
    fireEvent.click(screen.getByText(/Login/i));
    expect(screen.getByText(/Welcome, admin! You have successfully logged in./i)).toBeInTheDocument();
  });
});
