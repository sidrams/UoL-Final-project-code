import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../src/App'; // Import your component
import { BrowserRouter } from 'react-router-dom'
// import ayahImage from '../src/images/surah fatiha ayah 1.png'
import Image from './mocks/Image';
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()

beforeEach(() => {
  render(<App />, {wrapper: BrowserRouter});
});

describe('Home page renders as expected', () => {
  test('renders the landing page', () => {
    expect(screen.getByText(/Visual Quranic Ayah Finder/i));
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter a keywords here or upload an image...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Upload image" }).toBeEnabled);
    expect(screen.getByText("No searched text")).toBeInTheDocument();
  });

  test('should show search modal when click on the image upload button', () => {
    //Click on the search button
    const searchBtn = screen.getByRole("button", { name: "Upload image" });
    expect(searchBtn).not.toBeDisabled();
    fireEvent.click(searchBtn);

    //elements of modal are in the document
    expect(screen.getByText("Upload an image of a Verse")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" }).toBeEnabled);
  });

  test('should only allow an image to be uploaded',() => {
    const searchBtn = screen.getByRole("button", { name: "Upload image" });
    fireEvent.click(searchBtn);

    const input = screen.getByLabelText(/image/i)
    fireEvent.change(input, {
      target: {
        files: [new File(['(⌐□_□)'], 'test.png', {type: 'image/png'})],
      },
    })
    expect(input.files).toHaveLength(1)
    expect(input.files[0].type).toContain("image/")
  });

  test('should display an error message if image is not uploaded',async () => {
    // const searchBtn = screen.getByRole("button", { name: "Upload image" });
    fireEvent.click(screen.getByRole("button", { name: "Upload image" }));
    // const searchBtn2 = screen.getByRole("button", { name: "Search" });
    fireEvent.click(screen.getByRole("button", { name: "Search" }));

    const errorMsg = await screen.getByText(/Please upload an image/i)
    expect(errorMsg).toBeInTheDocument();

  });

  test('should display an error message if incorrect file type uploaded',async () => {
    fireEvent.click(screen.getByRole("button", { name: "Upload image" }));

    fireEvent.change(screen.getByLabelText(/image/i), {
      target: {
        files: [new File(['(⌐□_□)'], 'test.pdf', {type: 'pdf/doc'})],
      },
    })
    
    fireEvent.click(screen.getByRole("button", { name: "Search" }));

    const errorMsg = await screen.getByText(/Incorrect File Type/i)
    expect(errorMsg).toBeInTheDocument();

  });

  test('should close the modal if image parsed successfully', async () => {
    render(<Image />)
    const testImage = document.querySelector("img");
    fireEvent.click(screen.getByRole("button", { name: "Upload image" }));
    expect(testImage.alt).toContain("test");
    
    var fd = new FormData();
    fd.append('image', testImage);
    fireEvent.change(screen.getByLabelText(/image/i), {
      target: {
        files: fd,
      },
    })
    const searchBtn = await screen.findByRole("button", { name: "Search" })
    await user.click(searchBtn);
    
    expect(screen.getByText("Upload an image of a Verse" || "No searched text")).toBeInTheDocument();
  });
})