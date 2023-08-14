import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../src/App'; // Import your component
import DiscussionForum from '../src/pages/DiscussionForum/DiscussionForum'; // Import your component
import { BrowserRouter } from 'react-router-dom'

beforeEach(() => {
    render(<DiscussionForum />, {wrapper: BrowserRouter});
});

describe('Discussion page renders as expected', () => {
  test('renders the heading', () => {    
    // expect(screen.getByText(/Visual Quranic Ayah Finder/i));
    expect(screen.getByRole("heading")).toBeInTheDocument(/DiscussionForums/);
    // expect(screen.getByPlaceholderText("Enter a keywords here or upload an image...")).toBeInTheDocument();
    // expect(screen.getByRole("button", { name: "Upload image" }).toBeEnabled);
    // expect(screen.getByText("No searched text")).toBeInTheDocument();
  });

  // test('should show search modal when click on the image upload button', () => {
    // render(<DiscussionForum />, {wrapper: BrowserRouter});
    
    // //Click on the search button
    // const searchBtn = screen.getByRole("button", { name: "Upload image" });
    // expect(searchBtn).not.toBeDisabled();
    // fireEvent.click(searchBtn);

    // //elements of modal are in the document
    // expect(screen.getByText("Upload an image of a Verse")).toBeInTheDocument();
    // expect(screen.getByRole("button", { name: "Search" }).toBeEnabled);
  // });

//   test.todo('should only allow an image to be uploaded');

//   test.todo('should display a message if image is not uploaded');

//   test.todo('should display the recognised text if image is uploaded');

//   test.todo('should display another button after text is recognised');

})