import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchModal from '../../src/components/SearchBar/SearchModal';
import SearchBar from '../../src/components/SearchBar/SearchBar';
import SearchHeader from '../../src/components/SearchBar/SearchHeader';
import SearchInputComponent from '../../src/components/SearchBar/SearchInputComponent';
import SearchButton from '../../src/components/SearchBar/SearchButton';

// ALL TESTS FOR THE SEARCH BAR COMPONENT AND THE COMPONENTS RENDERED WITHIN
describe('SearchBar Component', () => {
  describe('SearchBar Component', () => {
    it('renders without errors', () => {
      render(<SearchBar />);
    });
  
    it('updates the text input value when typing', () => {
      render(<SearchBar />);
      const inputElement = screen.getByPlaceholderText("Enter a keywords here or upload an image...");
      fireEvent.change(inputElement, { target: { value: 'test input' } });
      expect(inputElement.value).toBe('test input');
    });
  
    it('opens the modal when the button is clicked', () => {
      render(<SearchBar />);
      const modalButton = screen.getByText(/Upload Image/i);
      fireEvent.click(modalButton);
      expect(screen.getByText('Upload an image of a Verse')).toBeInTheDocument();
    });
  
    it('closes the modal when the close button in the modal is clicked', () => {
      render(<SearchBar />);
      const modalButton = screen.getByText(/Upload Image/i);
      fireEvent.click(modalButton);
      expect(screen.getByText('Upload an image of a Verse')).toBeInTheDocument();
      
      const closeButton = screen.getByText('×');
      fireEvent.click(closeButton);
      expect(screen.queryByText('Upload an image of a Verse')).not.toBeInTheDocument();
    });
  
  });

  describe('SearchHeader Component', () => {

    it('renders without errors', () => {
      render(<SearchHeader />);
    });

    it('displays the heading text', () => {
      render(<SearchHeader />);
      expect(screen.getByText(/SEARCH FOR A .../i)).toBeInTheDocument();
      expect(screen.getByText(/verse by uploading an image/i)).toBeInTheDocument();
    });

    it('displays the vector image of a Quran', () => {
      render(<SearchHeader />);
      const quranImage = screen.getByAltText('vector image of a quran');
      expect(quranImage).toBeInTheDocument();
    });
  
    it('displays the border design element image', () => {
      render(<SearchHeader />);
      const borderImage = screen.getByAltText('border design element');
      expect(borderImage).toBeInTheDocument();
    });
  });

  describe('SearchInputComponent Component', () => {
    it('renders without errors', () => {
      render(<SearchInputComponent />);
    });
  
    it('renders an input element with the provided placeholder', () => {
      render(<SearchInputComponent />);
      const inputElement = screen.getByPlaceholderText('Enter a keywords here or upload an image...');
      expect(inputElement).toBeInTheDocument();
    });
  
    it('updates the input value when typing', () => {
      render(<SearchInputComponent />);
      const inputElement = screen.getByPlaceholderText('Enter a keywords here or upload an image...');
      fireEvent.change(inputElement, { target: { value: 'test input' } });
      expect(inputElement.value).toBe('test input');
    });
  
    it('calls the fetchData function when Enter key is pressed', () => {
      const fetchData = jest.fn();
      const setTextInput = jest.fn((x) => "pass")
      render(<SearchInputComponent fetchData={fetchData} showResults={false}  setTextInput={setTextInput} />);
      const inputElement = screen.getByPlaceholderText('Enter a keywords here or upload an image...');
      fireEvent.change(inputElement, { target: { value: 'test input' } });
      fireEvent.keyPress(inputElement, { key: 'Enter', code: 13, charCode: 13 });
      expect(fetchData).toHaveBeenCalledWith('test input');
    });
  
    it('does not call the fetchData function when Enter key is pressed and showResults is true', () => {
      const fetchData = jest.fn();
      render(<SearchInputComponent fetchData={fetchData} showResults={true} />);
      const inputElement = screen.getByPlaceholderText('Enter a keywords here or upload an image...');
      fireEvent.change(inputElement, { target: { value: 'test input' } });
      fireEvent.keyPress(inputElement, { key: 'Enter', code: 13, charCode: 13 });
      expect(fetchData).not.toHaveBeenCalled();
    });
  
    it('opens the modal when the "Upload image" button is clicked', () => {
      const setShowModal = jest.fn();
      render(<SearchInputComponent setShowModal={setShowModal} />);
      const uploadButton = screen.getByText('Upload image');
      fireEvent.click(uploadButton);
      expect(setShowModal).toHaveBeenCalledWith(true);
    });
  
  });

  describe('SearchModal Component', () => {

    it('renders without errors', () => {
      render(<SearchModal />);
    });

    it('displays the "Upload an image of a Verse" header', () => {
      render(<SearchModal />);
      const headerText = screen.getByText('Upload an image of a Verse');
      expect(headerText).toBeInTheDocument();
    });

    it('displays an error message if no image is selected', () => {
      render(<SearchModal />);
      fireEvent.click(screen.getByText('Search'));
      expect(screen.getByText('Please upload an image')).toBeInTheDocument();
    });

    it('displays an error message if an incorrect file type is selected', () => {
      render(<SearchModal />);
      const fileInput = screen.getByLabelText('image');
      const imageFile = new File(['dummy content'], 'example.txt', { type: 'text/plain' });
      fireEvent.change(fileInput, { target: { files: [imageFile] } });
      fireEvent.click(screen.getByText('Search'));
      expect(screen.getByText('Incorrect File Type')).toBeInTheDocument();
    });

    it('hides the modal when the close button is clicked', () => {
      const { container } = render(<SearchBar ><SearchModal /></SearchBar>);
      fireEvent.click(screen.getByRole("button", { name: "Upload image" }))
      const closeButton = screen.getByRole("button", { name: "×" })
      // const closeButton = container.querySelector('close-btn');
      console.log(closeButton)
      fireEvent.click(closeButton);
      expect(screen.queryByText('Upload an image of a Verse')).not.toBeInTheDocument();
    });

    
  

  });

  describe('SearchButton Component', () => {
    it('renders without errors', () => {
      render(<SearchButton />);
    });
  
    it('renders the "Search" button with the expected styles', () => {
      render(<SearchButton />);
      const searchButton = screen.getByText('Search');
      expect(searchButton).toBeInTheDocument();
      expect(searchButton).toHaveClass('bg-blackish-blue text-[white] hover:text-blackish-blue hover:bg-[white] uppercase tracking-wider font-medium text-sm');
    });
  
    it('calls the onClick function when the button is clicked', () => {
      const onClick = jest.fn();
      render(<SearchButton onClick={onClick} />);
      const searchButton = screen.getByText('Search');
      fireEvent.click(searchButton);
      expect(onClick).toHaveBeenCalled();
    });
  
  });
})