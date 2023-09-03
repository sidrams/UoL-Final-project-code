import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import BackButton from '../../src/components/Buttons/BackButton';

// ALL TESTS FOR THE BUTTONS COMPONENT AND THE COMPONENTS RENDERED WITHIN
describe('Button Component', () => {
    describe('BackButton Component', () => {
        it('renders without errors', () => {
          render(<BackButton />);
        });
      
        it('renders the button with the provided text', () => {
          render(<BackButton text="Go Back" />);
          const backButton = screen.getByText('Go Back');
          expect(backButton).toBeInTheDocument();
        });
      
        it('calls the onClick function when the button is clicked', () => {
          const onClick = jest.fn();
          render(<BackButton onClick={onClick} text='test' />); // set button text to 'test' for testing
          const backButton = screen.getByText('test');
          fireEvent.click(backButton);
          expect(onClick).toHaveBeenCalled();
        });
      
        it('applies custom styles to the button', () => {
          render(<BackButton customStyle="custom-button-style" />);
          const backButton = screen.getByRole('button');
          expect(backButton).toHaveClass('custom-button-style');
        });
      
        it('applies custom styles to the icon', () => {
          render(<BackButton customIconStyle="custom-icon-style" icon='←' />); // set button icon to '←' for testing
          const icon = screen.getByText('←'); 
          expect(icon).toHaveClass('custom-icon-style');
        });
      
      });
})
