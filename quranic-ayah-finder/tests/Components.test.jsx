import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../src/App'; // Import your component
import SearchBar from '../src/components/SearchBar/SearchBar'; // Import your component
import SearchModal from '../src/components/SearchBar/SearchModal'; // Import your component
import Navbar from '../src/components/Navbar/Navbar'; // Import your component
import Home from '../src/pages/Home/Home'; // Import your component
import DiscussionForum from '../src/pages/DiscussionForum/DiscussionForum'; // Import your component
import FAQ from '../src/pages/FAQs/FAQ'; // Import your component
import Guides from '../src/pages/Guides/Guides'; // Import your component
import SignUp from '../src/pages/SignUp/SignUp'; // Import your component
import {BrowserRouter, MemoryRouter} from 'react-router-dom'

describe('check all components exist and render', () => {
  test('Search Bar', () => {
    render(<SearchBar />);
    // const buttonElement = screen.getByText(/hello/i);
    // expect(buttonElement).toBeInTheDocument();
  });
  
  test('Search Modal', () => {
    render(<SearchModal />);
    // const buttonElement = screen.getByText(/hello/i);
    // expect(buttonElement).toBeInTheDocument();
  });

  test('Navigation Bar', () => {
    render(<Navbar />, {wrapper: BrowserRouter});
    // const buttonElement = screen.getByText(/hello/i);
    // expect(buttonElement).toBeInTheDocument();
  });
})

describe('check all pages exist and render', () => {
  test('App or landing page', () => {
    render(<App />, {wrapper: BrowserRouter});
  });

  test('Home page', () => {
    render(<Home />);
  });

  test('Discussion Forum page', () => {
    render(<DiscussionForum />);
  });
  
  test('FAQs page', () => {
    render(<FAQ />);
  });

  test('Guides page', () => {
    render(<Guides />);
  });

  test('Sign up page', () => {
    render(<SignUp />);
  });
})

// function sum(a, b) {
//     return a + b;
//   }

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });