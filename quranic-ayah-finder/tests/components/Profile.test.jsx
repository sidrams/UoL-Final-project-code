import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom'; // Used to provide route params
import ProfileHeader from '../../src/components/Profile/ProfileHeader';
import ProfileTiles from '../../src/components/Profile/ProfileTiles';
import ProgressTiles from '../../src/components/ProfileScore/ProgressTiles'
import IndivisualProgressComponent from '../../src/components/ProfileScore/IndivisualProgressComponent'
import AttemptedTopicList from '../../src/components/ProfileScore/AttemptedTopicList'
import { Context } from '../../src/Context';

describe('Profile related components', () => {
    describe('ProfileHeader', () => {
        it('renders correctly', () => {
            // Provide route parameters 
            const loggedUser = {
                id: 1,
                username: 'testUser',
              };
            const setLoggedUser = jest.fn(() => loggedUser)

            render(
            <MemoryRouter initialEntries={['/profile/testUser']}>
                <Context.Provider value={{ loggedUser, setLoggedUser}}>
                <Routes>
                    <Route path="/profile/:username" element={<ProfileHeader />} />
                </Routes>
                </Context.Provider>
            </MemoryRouter>
            );
        
            // Assertions based on component's expected content
            expect(screen.getByText("Your Profile")).toBeInTheDocument();
            expect(screen.getByText("Logged in as")).toBeInTheDocument();
        });
    });

    describe('ProgressTiles', () => {
        it('renders correctly with scoreData', () => {
          const scoreData = [
            {
              score: 80,
              time_taken_at: new Date().toISOString(),
            },
            {
              score: 90,
              time_taken_at: new Date().toISOString(),
            },
          ];
      
          render(<ProgressTiles scoreData={scoreData} />);
      
          // Assertions based on  component's expected content
          expect(screen.getByText('Quizzes Attempted')).toBeInTheDocument();
          expect(screen.getByText('Average Score')).toBeInTheDocument();
          expect(screen.getByText('Highest Score achieved')).toBeInTheDocument();
          expect(screen.getByText('Last attempt')).toBeInTheDocument();
          expect(screen.getByText('2')).toBeInTheDocument(); // Number of quizzes attempted
          expect(screen.getByText('85')).toBeInTheDocument(); // Average score (rounded)
          expect(screen.getByText('90')).toBeInTheDocument(); // Highest score achieved
          expect(screen.getByText(/Last attempt/)).toBeInTheDocument();
        });
      
        it('renders correctly with empty scoreData', () => {
          const scoreData = [];
      
          render(<ProgressTiles scoreData={scoreData} />);
      
          // Assertions based on  component's expected content when scoreData is empty
          expect(screen.getByText('Quizzes Attempted')).toBeInTheDocument();
          expect(screen.getByText('Average Score')).toBeInTheDocument();
          expect(screen.getByText('Highest Score achieved')).toBeInTheDocument();
          expect(screen.getByText('Last attempt')).toBeInTheDocument();
          expect(screen.getAllByText('NA')[0]).toBeInTheDocument(); // Number of quizzes attempted
          expect(screen.getAllByText('NA')[1]).toBeInTheDocument(); // Average score
        //   expect(screen.getAllByText('NA')[2]).toBeInTheDocument(); // Highest score achieved
        //   expect(screen.getAllByText('NA')[3]).toBeInTheDocument(); // Last attempt
        });
      });

      describe('IndivisualProgressComponent', () => {
  
        it('renders correctly with empty scoreData', () => {
          const scoreData = [];
          const inputText = 'Topic 1';
      
          render(<IndivisualProgressComponent scoreData={scoreData} inputText={inputText} />);
      
          // Assertions based on  component's expected content when scoreData is empty
          expect(screen.getByText('No Progress to show. Attempt some quizzes and make sure to save your progress to see some results here.')).toBeInTheDocument();
        });
      
      });

      describe('AttemptedTopicList', () => {
        it('renders correctly with topics', () => {
          const getTopicsAttempted = () => ['Topic 1', 'Topic 2', 'Topic 3'];
      
          render(<AttemptedTopicList getTopicsAttempted={getTopicsAttempted} />);
      
          // Assertions based on  component's expected content
          expect(screen.getByText('Topics completed')).toBeInTheDocument();
          expect(screen.getByText('Topic 1')).toBeInTheDocument();
          expect(screen.getByText('Topic 2')).toBeInTheDocument();
          expect(screen.getByText('Topic 3')).toBeInTheDocument();
        });
      
        it('renders correctly with empty topics', () => {
          const getTopicsAttempted = () => [];
      
          render(<AttemptedTopicList getTopicsAttempted={getTopicsAttempted} />);
      
          // Assertions based on  component's expected content when topics are empty
          expect(screen.getByText('Topics completed')).toBeInTheDocument();
          expect(screen.queryByText('Topic 1')).not.toBeInTheDocument();
          expect(screen.queryByText('Topic 2')).not.toBeInTheDocument();
          expect(screen.queryByText('Topic 3')).not.toBeInTheDocument();
        });
      });

      describe('ProfileTiles', () => {
        it('renders correctly with profile data for the different user', () => {
          const profileData = {
            progress: [{ time_taken_at: new Date() }],
            savedSearches: [],
            posts: [],
          };
      
          render(
            <MemoryRouter>
              <ProfileTiles profileData={profileData} />
            </MemoryRouter>
          );
      
          // Assertions based on  component's expected content for the logged-in user
          expect(screen.getByText('Quizzes Attempted')).toBeInTheDocument();
          expect(screen.getByText('Last Attempted')).toBeInTheDocument();
          expect(screen.getByText('Posts Shared')).toBeInTheDocument();
          expect(screen.getByText('Last posted')).toBeInTheDocument();
        });
      
        it('renders correctly with profile data for a logged-in user', () => {
            const loggedUser = {
                id: 1,
                username: 'testUser',
              };
            const setLoggedUser = jest.fn(() => loggedUser)
            // mock data
            const profileData = {
                progress: [{
                    "id": 18,
                    "quiz_topic_id": {
                        "id": 2,
                        "topic_name": "Fruits in the Quran"
                    },
                    "score": 1,
                    "time_taken_at": "2023-09-02T02:22:34.915362Z"
                }],
                savedSearches: [{
                    "id": 7,
                    "verse_key": "27:35",
                    "translation": "test",
                    "user_notes": "a verse with translation again",
                    "saved": "2023-09-02T16:23:49.093452Z",
                    "updated": "2023-09-02T19:28:08.494286Z"
                }],
                posts: [{
                    "pk": 38,
                    "title": "lets upload an image",
                    "description": "",
                    "updated": "2023-09-02T03:32:15.313204Z",
                    "created": "2023-09-02T03:29:22.463439Z",
                    "image": null
                }],
            };
      
          render(
            <MemoryRouter initialEntries={['/profile/testUser']}>
                <Context.Provider value={{ loggedUser, setLoggedUser}}>
                    <Routes>
                        <Route path="/profile/:username" element={<ProfileTiles profileData={profileData} />} />
                    </Routes>
                </Context.Provider>
            </MemoryRouter>
          );
      
          // Assertions based on  component's expected content for a different user
          expect(screen.getByText('Quizzes Attempted')).toBeInTheDocument();
          expect(screen.getByText('Saved Searches')).toBeInTheDocument();
          expect(screen.getByText('Posts Shared')).toBeInTheDocument();
          expect(screen.getByText('Last posted')).toBeInTheDocument();
        });
      
        it('renders correctly with empty profile data', () => {
          const profileData = {
            progress: [],
            savedSearches: [],
            posts: [],
          };
      
          render(
            <MemoryRouter>
              <ProfileTiles profileData={profileData} />
            </MemoryRouter>
          );
      
          // Assertions based on component's expected content when profile data is empty
          expect(screen.getByText('Quizzes Attempted')).toBeInTheDocument();
          expect(screen.getByText('Last Attempted')).toBeInTheDocument();
          expect(screen.getByText('Posts Shared')).toBeInTheDocument();
          expect(screen.getByText('Last posted')).toBeInTheDocument();
        });
      });
      
})