import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import FAQ from '../../src/pages/FAQs/FAQ';

beforeEach(() => {
    render(<FAQ />, {wrapper: BrowserRouter});
});

describe('check FAQ page renders as expected', () => {
  test('renders the heading', () => {    
    expect(screen.getByText("FAQ (Frequently Asked Questions)")).toBeInTheDocument();
  });
})