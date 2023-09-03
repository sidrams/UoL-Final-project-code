import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../src/pages/Login/Login';
import { BrowserRouter } from 'react-router-dom';

describe('Login', () => {
  it('renders login form correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Check if the login form elements are present
    expect(screen.getAllByText('Login')[0]).toBeInTheDocument();
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

//   it('handles form input and login', () => {
//     render(
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     );

//     // Fill in the form fields
//     fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testuser' } });
//     fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'testpassword' } });

//     // Simulate login button click
//     fireEvent.click(screen.getByText('Login'));
//   });

});
