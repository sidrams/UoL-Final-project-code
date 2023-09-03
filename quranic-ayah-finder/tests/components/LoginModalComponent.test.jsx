import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginModalComponent from './../../src/components/Login/LoginModalComponent';
import { Context } from '../../src/Context';
import { BrowserRouter } from 'react-router-dom';

describe('LoginModalComponent', () => {
    const loggedUser = {
        id: 1,
        username: 'testUser',
      };
      const setLoggedUser = jest.fn(() => loggedUser)
      const setShowLoginMock = jest.fn();

      beforeEach(() => {
          jest.clearAllMocks();
          render(
              <Context.Provider value={{ loggedUser, setLoggedUser }}>
                  <LoginModalComponent setShowLogin={setShowLoginMock} />
              </Context.Provider>
              ,{wrapper: BrowserRouter}
          );
      });

  it('renders login form by default', () => {
    // Check if the login form elements are rendered
    expect(screen.getAllByText('Login')[0]).toBeInTheDocument();
    expect(screen.getByText('Username:')).toBeInTheDocument();
    expect(screen.getAllByText('Password::')[0]).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('switches to registration form when "Register" is clicked', () => {
    // Click the "Register" link
    fireEvent.click(screen.getByText('Register'));

    // Check if the registration form elements are rendered
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByText('Username:')).toBeInTheDocument();
    expect(screen.getByText('Password:')).toBeInTheDocument();
    expect(screen.getByText('Already Signed Up?')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

//   it('calls the login function when "Login" button is clicked', () => {
//     // Simulate user input in the login form
//     fireEvent.change(screen.getByPlaceholderText('Username'), {
//       target: { value: 'testusername' },
//     });
//     fireEvent.change(screen.getByPlaceholderText('Password'), {
//       target: { value: 'testpassword' },
//     });

//     // Click the "Login" button
//     fireEvent.click(screen.getByRole("button", { name: "Login" }))

//     // Check if the login function is called
//     expect(setShowLoginMock).toHaveBeenCalledWith(false);
//   });
});
