import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import SignUp from '../../src/pages/SignUp/SignUp';

beforeEach(() => {
    render(<SignUp />, {wrapper: BrowserRouter});
});

describe('check Home page renders as expected', () => {
  test('renders the heading', () => {    
    expect(screen.getByRole("heading")).toBeInTheDocument(/SignUp/);
  });

  it('renders registration form correctly', () => {
    // Check if the registration form elements are present
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByText("Already Signed Up?")).toBeInTheDocument();
  });

  // it('handles form input and registration', () => {
  //   // Fill in the form fields
  //   fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testuser' } });
  //   fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'testpassword' } });

  //   // Simulate registration button click
  //   fireEvent.click(screen.getByText('Register'));
  // });
});