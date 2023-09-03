import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import EndGuideComponent from '../../src/components/Guides/EndGuideComponent';

// ALL TESTS FOR THE GUIDES COMPONENT AND THE COMPONENTS RENDERED WITHIN
describe('EndGuideComponent Component', () => {
  it('renders without errors', () => {
    render(<Router><EndGuideComponent id={1} restartGuide={() => {}} /></Router>);
  });

  it('displays the "Well Done!" message', () => {
    render(<Router><EndGuideComponent id={1} restartGuide={() => {}} /></Router>);
    const message = screen.getByText('Well Done! The Guide has now ended.');
    expect(message).toBeInTheDocument();
  });

  it('renders the "Restart Guide" button with the expected text and icon', () => {
    const restartGuide = jest.fn();
    render(<Router><EndGuideComponent id={1} restartGuide={restartGuide} /></Router>);
    const restartButton = screen.getByText('Restart Guide');
    expect(restartButton).toBeInTheDocument();
    expect(restartButton).toHaveTextContent('Restart Guide');
    // You can also check the icon if needed.
  });

  it('renders the "Take the quiz" button with the expected text and link', () => {
    render(<Router><EndGuideComponent id={1} restartGuide={() => {}} /></Router>);
    const quizButton = screen.getByText('Take the quiz');
    expect(quizButton).toBeInTheDocument();
    expect(quizButton).toHaveAttribute('href', '/guides/topic/1/Quiz');
    // You can also check the icon if needed.
  });

  it('renders the "Go back to topics" button with the expected text and link', () => {
    render(<Router><EndGuideComponent id={1} restartGuide={() => {}} /></Router>);
    const backButton = screen.getByText('Go back to topics');
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute('href', '/guides');
    // You can also check the icon if needed.
  });

});