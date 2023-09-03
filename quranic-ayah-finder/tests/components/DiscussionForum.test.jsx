import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ForumPostComponent from '../../src/components/DiscussionForum/ForumPostComponent';
import SlOptionsVertical from 'react-icons/sl'
import ForumPostToggleMenu from '../../src/components/DiscussionForum/ForumPostToggleMenu';
import ForumSubComponent from '../../src/components/DiscussionForum/ForumSubComponent';
import { BrowserRouter } from 'react-router-dom'
import { Context } from '../../src/Context';

// ALL TESTS FOR THE DISCUSSION FORUM COMPONENT AND THE COMPONENTS RENDERED WITHIN
describe('DiscussionForum Component', () => {
    describe('ForumPostComponent', () => {
        // set mocked logged user for Context API
        const mockLoggedUser = {
          id: 1,
          username: 'testUser',
        };
      
        // clear all mocks 
        beforeEach(() => {
          jest.clearAllMocks();
        });
      
        it('renders without errors', () => {
          const posts = []; // Provide some mock posts here
          render(<ForumPostComponent posts={posts} inputText="" />);
        });
      
        it('displays post titles', () => {
          const posts = [ // Provide some mock posts here to pass to component
            { pk: 1, title: 'Post 1', user: { id: 1, username: 'testUser' } },
            { pk: 2, title: 'Post 2', user: { id: 2, username: 'anotherUser' } },
          ];
      
          render(<ForumPostComponent posts={posts} inputText="" />, {wrapper: BrowserRouter});
          
          const post1Title = screen.getByText('Post 1');
          const post2Title = screen.getByText('Post 2');
      
          expect(post1Title).toBeInTheDocument();
          expect(post2Title).toBeInTheDocument();
        });
      
        it('displays delete confirmation modal when prompted', () => {
            // Provide some mock posts here to pass to component
            const posts = [{ pk: 1, title: 'Test Post', user: { id: 1, username: 'testUser' } }];
            // set mock user to provide for Context API
            const loggedUser = mockLoggedUser
            const setLoggedUser = jest.fn(() => mockLoggedUser)
            
            render(
                // render with Context API provider
                <Context.Provider value={{ loggedUser, setLoggedUser}}>
                    <ForumPostComponent posts={posts} inputText="" />
                </Context.Provider>
                ,{wrapper: BrowserRouter});
            
            console.log(screen)
            fireEvent.click(screen.getByTestId('toggle-menu'))
            const deleteButton = screen.getByText('Delete');
            fireEvent.click(deleteButton);
        
            const confirmationModal = screen.getByText('Are you sure you want to delete?');
            expect(confirmationModal).toBeInTheDocument();
        });
      });

      describe('ForumPostToggleMenu Component', () => {
        // Provide some mock posts and functions
        const post = { pk: 1, title: 'Test Post', user: { id: 1, username: 'testUser' } }
        const setPost_id = jest.fn((e) => e)
        const setShowDelete = jest.fn();

        // render component by passing it props
        beforeEach(() => {
            render(<ForumPostToggleMenu post={post} setPost_id={setPost_id} setShowDelete={setShowDelete} />);
        });

        it('renders without errors', () => {
          render(<ForumPostToggleMenu />);
        });
      
        it('displays a delete option in the menu', () => {
          fireEvent.click(screen.getByTestId('toggle-menu'))
          const deleteOption = screen.getByText('Delete');
          expect(deleteOption).toBeInTheDocument();
        });
      
        // it('opens the menu when the button is clicked', () => {
        //     //   render(<ForumPostToggleMenu />);
        //     const button = screen.getByTestId('toggle-menu')
        //     fireEvent.click(button);
        //     //   const menu = screen.getByRole('menu');
        //     const menu = screen.getByTestId('toggle-menu-role')
        //     expect(menu).toBeInTheDocument();
        // });
      
        it('calls setShowDelete when the delete option is clicked', () => {
            fireEvent.click(screen.getByTestId('toggle-menu'))
            const deleteOption = screen.getByText('Delete');
            fireEvent.click(deleteOption);
            expect(setShowDelete).toHaveBeenCalledWith(true);
        });
      });

      describe('ForumSubComponent Component', () => {
        const loggedUser = {
          id: 1,
          username: 'testUser',
        };
        const setLoggedUser = jest.fn(() => loggedUser)
        const post = {
            user: { id: 1, username: 'testUser' },
            updated: new Date(),
            comment_count: 0,
        };

        beforeEach(() => {
            jest.clearAllMocks();
            render(
                <Context.Provider value={{ loggedUser, setLoggedUser }}>
                    <ForumSubComponent post={post} />
                </Context.Provider>
                ,{wrapper: BrowserRouter}
            );
        });
      
        it('renders without errors', () => {
            const post = {
                user: { id: 1, username: 'testUser' },
                updated: new Date(),
                comment_count: 0,
            };
            render(
                <Context.Provider value={{ loggedUser, setLoggedUser }}>
                    <ForumSubComponent post={post} />
                </Context.Provider>
                ,{wrapper: BrowserRouter}
            );
        });
      
        it('displays the username with a link to the user profile', () => {
        //   const post = {
        //     user: { id: 1, username: 'testUser' },
        //     updated: new Date(),
        //     comment_count: 0,
        //   };
        //   render(<ForumSubComponent post={post} />);
          const usernameLink = screen.getByText('@testUser');
          expect(usernameLink).toBeInTheDocument();
        });
      
        it('displays the time since the post was updated', () => {
          const timeAgo = screen.getByText(/ago/);
          expect(timeAgo).toBeInTheDocument();
        });
      
        it('displays the number of comments with a link to the post', () => {
        //   const post = {
        //     user: { id: 1, username: 'testUser' },
        //     updated: new Date(),
        //     comment_count: 5,
        //   };
        //   render(<ForumSubComponent post={post} />);
          const commentsLink = screen.getByText('0 comments');
          expect(commentsLink).toBeInTheDocument();
        });
      
        it('displays an edit link for the logged-in user', () => {
        //   const post = {
        //     user: { id: 1, username: 'testUser' },
        //     updated: new Date(),
        //     comment_count: 0,
        //   };
      
        //   const { loggedUser } = require('../../src/Context'); // Import the mock loggedUser from the mock Context
        //   loggedUser.mockReturnValue(mockLoggedUser);
      
        //   render(<ForumSubComponent post={post} />);
            const editLink = screen.getByText('Edit');
            expect(editLink).toBeInTheDocument();
        });
      });
})