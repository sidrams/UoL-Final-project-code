import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../../src/App'; // Import your component
import SearchBar from '../../src/components/SearchBar/SearchBar'; // Import your component
import SearchModal from '../../src/components/SearchBar/SearchModal'; // Import your component
import Navbar from '../../src/components/Navbar/Navbar'; // Import your component
import {BrowserRouter} from 'react-router-dom'

describe('check all components exist and render', () => {
  test('Search Bar', () => {
    render(<SearchBar />);
  });
  
  test('Search Modal', () => {
    render(<SearchModal />);
  });

  test('Navigation Bar', () => {
    render(<Navbar />, {wrapper: BrowserRouter});
  });
})
