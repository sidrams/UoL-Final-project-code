import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Context } from '../../src/Context';
import { BrowserRouter } from 'react-router-dom';
import PostComponent from '../../src/components/Posts/PostComponent';
import PostComponentBody from '../../src/components/Posts/PostComponentBody';
import PostComponentSubSection from '../../src/components/Posts/PostComponentSubSection'
import CommentsComponent from '../../src/components/Posts/CommentsComponent';
import FeaturedPostsSideBar from '../../src/components/Posts/FeaturedPostsSideBar'

describe('Posts related Component', () => {
    describe('PostComponent', () => {
      const loggedUser = {
        id: 1,
        username: 'testUser',
      };
      const setLoggedUser = jest.fn(() => loggedUser)
      const posts = [
        {
          pk: 1,
          title: 'Post 1',
          description: 'Description 1',
          user: { username: 'user1' },
          updated: new Date(),
          comment_count: 3,
        },
        {
          pk: 2,
          title: 'Post 2',
          description: 'Description 2',
          user: { username: 'testUser' },
          updated: new Date(),
          comment_count: 1,
        },
      ];
      const inputText = ''

      // beforeEach(() => {
      //   const {rerender} = render(
      //     <Context.Provider value={{ loggedUser, setLoggedUser }}>
      //       <PostComponent posts={posts} inputText={inputText} />
      //     </Context.Provider>
      //     ,{wrapper: BrowserRouter}
      //   );
      // });
        it('renders correctly with no posts', () => {
          const inputText = '';
          const posts = [];
      
          render(<PostComponent posts={posts} inputText={inputText} />);
      
          // Assertions
          expect(screen.getByText('No posts to show')).toBeInTheDocument();
        });
      
        it('renders correctly with filtered posts', () => {
          const inputText = 'post 1';
          const setPost_id = jest.fn();
          const setShowDelete = jest.fn();
          
          // const {rerender} = 
          render(
            <Context.Provider value={{ loggedUser, setLoggedUser }}>
              <PostComponent posts={posts} inputText={inputText} />
            </Context.Provider>
            ,{wrapper: BrowserRouter}
          );
          // re-render the same component with input filters
          // rerender(<PostComponent posts={posts} inputText={inputText} />)

          // Assertions
          expect(screen.getByText('Post 1')).toBeInTheDocument();
          expect(screen.getByText('@user1')).toBeInTheDocument();
          expect(screen.getByText('3 comments')).toBeInTheDocument();
      
          expect(screen.queryByText('Post 2')).toBeNull();
          expect(screen.queryByText('@user2')).toBeNull();
          expect(screen.queryByText('1 comment')).toBeNull();
        });
      });

      
    describe('PostComponentBody', () => {
      it('renders correctly with post data', () => {
        const post = {
          title: 'Sample Post',
          description: 'This is a sample post description.',
          image: 'sample-image.jpg',
        };

        render(<PostComponentBody post={post} />);

        // Assertions
        expect(screen.getByText('Sample Post')).toBeInTheDocument();
        expect(screen.getByText('This is a sample post description.')).toBeInTheDocument();
        expect(screen.getByAltText('Sample Post')).toBeInTheDocument();
      });

      it('renders correctly without post data', () => {
        const post = null;

        render(<PostComponentBody post={post} />);

        // Assertions
        expect(screen.queryByText('Sample Post')).toBeNull();
        expect(screen.queryByText('This is a sample post description.')).toBeNull();
        expect(screen.queryByAltText('Sample Post')).toBeNull();
      });

    });

    describe('PostComponentSubSection', () => {
      it('renders correctly with post and comments data', () => {
        const post = {
          user: {
            username: 'sampleuser',
          },
          updated: new Date(),
        };
        const comments = [
          { id: 1, text: 'Comment 1' },
          { id: 2, text: 'Comment 2' },
        ];
        const loggedUser = {
          id: 1,
          username: 'testUser',
        };
        const setLoggedUser = jest.fn(() => loggedUser)

        render(
          <Context.Provider value={{ loggedUser, setLoggedUser }}>
            <PostComponentSubSection post={post} comments={comments} />
          </Context.Provider>
          , {wrapper: BrowserRouter}
        );
    
        // Assertions
        expect(screen.getByText('@sampleuser')).toBeInTheDocument();
        expect(screen.getByText('0 minutes ago')).toBeInTheDocument();
        expect(screen.getByText('2 comments')).toBeInTheDocument();
      });
    
      it('renders correctly without post and comments data', () => {
        const post = null;
        const comments = [];
    
        const loggedUser = {
          id: 1,
          username: 'testUser',
        };
        const setLoggedUser = jest.fn(() => loggedUser)

        render(
          <Context.Provider value={{ loggedUser, setLoggedUser }}>
            <PostComponentSubSection post={post} comments={comments} />
          </Context.Provider>
          , {wrapper: BrowserRouter}
        );
        
        // Assertions
        expect(screen.queryByText('@sampleuser')).toBeNull();
        expect(screen.queryByText('0 minutes ago')).toBeNull();
        expect(screen.queryByText('2 comments')).toBeNull();
      });
    
    });


    describe('CommentsComponent', () => {
      it('renders existing comments correctly', () => {
        const comments = [
          {
            id: 1,
            user: {
              username: 'user1',
            },
            updated: new Date().toISOString(),
            body: 'Comment 1',
          },
          {
            id: 2,
            user: {
              username: 'user2',
            },
            updated: new Date().toISOString(),
            body: 'Comment 2',
          },
        ];
    
        render(<CommentsComponent id={1} comments={comments} setComments={() => {}} setShowLogin={() => {}} />);
    
        // Assertions
        expect(screen.getByText('@user1')).toBeInTheDocument();
        expect(screen.getByText('@user2')).toBeInTheDocument();
        expect(screen.getByText('Comment 1')).toBeInTheDocument();
        expect(screen.getByText('Comment 2')).toBeInTheDocument();
        expect(screen.getAllByText('0 minutes ago')[0]).toBeInTheDocument();
      });
    
      // it('handles posting a comment', async () => {
      //   const comments = [];
      //   const setCommentsMock = jest.fn((comment) => comments.push(comment));
      //   const setShowLoginMock = jest.fn();
      //   const loggedUser = {
      //     id: 1,
      //     username: 'testUser',
      //   };
      //   const setLoggedUser = jest.fn(() => loggedUser)

      //   render(
      //     <Context.Provider value={{ loggedUser, setLoggedUser }}>
      //       <CommentsComponent id={1} comments={comments} setComments={setCommentsMock} setShowLogin={setShowLoginMock} />
      //     </Context.Provider>
      //   );
    
      //   // Simulate entering a new comment and clicking the "Post" button
      //   const commentInput = screen.getByPlaceholderText('Add a new comment here');
      //   const postButton = screen.getByText('Post');
    
      //   fireEvent.change(commentInput, { target: { value: 'New Comment' } });
      //   fireEvent.click(postButton);
    
      //   // Assertions
      //   expect(setShowLoginMock).toHaveBeenCalledWith(expect.any(Array));
      //   expect(commentInput.value).toBe('');
      // });
    
      it('handles not logged in user attempting to post', () => {
        const setCommentsMock = jest.fn();
        const setShowLoginMock = jest.fn();
        const comments = [];
    
        render(<CommentsComponent id={1} comments={comments} setComments={setCommentsMock} setShowLogin={setShowLoginMock} />);
    
        // Simulate clicking the "Post" button without entering a comment
        const postButton = screen.getByText('Post');
    
        fireEvent.click(postButton);
    
        // Assertions
        expect(setCommentsMock).not.toHaveBeenCalled();
        expect(setShowLoginMock).toHaveBeenCalledWith(true);
      });
    });

    describe('FeaturedPostsSideBar', () => {
      it('renders featured posts correctly', () => {
        const featuredPosts = [
          {
            pk: 1,
            user: {
              username: 'user1',
            },
            updated: new Date(),
            title: 'Post 1 Title',
          },
          {
            pk: 2,
            user: {
              username: 'user2',
            },
            updated: new Date(),
            title: 'Post 2 Title',
          },
        ];
    
        const loggedUser = {
          id: 1,
          username: 'testUser',
        };
        const setLoggedUser = jest.fn(() => loggedUser)
    
        render(
          <Context.Provider value={{ loggedUser, setLoggedUser }}>
            <FeaturedPostsSideBar featuredPosts={featuredPosts} setPost={() => {}} id={3} comments={[]} />
          </Context.Provider>
          , {wrapper: BrowserRouter}
        );
    
        // Assertions
        expect(screen.getByText('Post 1 Title')).toBeInTheDocument();
        expect(screen.getByText('Post 2 Title')).toBeInTheDocument();
        expect(screen.getAllByText('0 minutes ago')[0]).toBeInTheDocument();
        expect(screen.getByText('@user1')).toBeInTheDocument();
      });
    
      it('handles clicking on a featured post', () => {
        const setPostMock = jest.fn();
        const featuredPosts = [
          {
            pk: 1,
            user: {
              username: 'user1',
            },
            updated: new Date(),
            title: 'Post 1 Title',
          },
          {
            pk: 2,
            user: {
              username: 'user2',
            },
            updated: new Date(),
            title: 'Post 2 Title',
          },
        ];
        const loggedUser = {
          id: 1,
          username: 'testUser',
        };
        const setLoggedUser = jest.fn(() => loggedUser)
    
        render(
          <Context.Provider value={{ loggedUser, setLoggedUser }}>
            <FeaturedPostsSideBar featuredPosts={featuredPosts} setPost={setPostMock} id={3} comments={[]} />
          </Context.Provider>
          , {wrapper: BrowserRouter}
        );
    
        // Simulate clicking on a featured post
        const postLink = screen.getByText('Post 1 Title');
        fireEvent.click(postLink);
    
        // Assertions
        expect(setPostMock).toHaveBeenCalledWith(featuredPosts[0]);
      });
    });

})