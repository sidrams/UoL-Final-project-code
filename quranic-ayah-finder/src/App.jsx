// import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import "./components/Styles/styles.css" 
import Home from './pages/Home/Home'
import Guides from './pages/Guides/Guides'
import FAQ from './pages/FAQs/FAQ'
import DiscussionForum from './pages/DiscussionForum/DiscussionForum'
import SignUp from './pages/SignUp/SignUp'
import { Navigate, Route, Routes } from 'react-router-dom'
import PostDetails from './pages/DiscussionForum/PostDetails'
import PostForm from './pages/DiscussionForum/PostForm'
import Login from './pages/Login/Login'
import { Context } from './Context'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import LogoutModal from './components/Logout/Logout'
import Categories from './pages/Guides/Categories'
import Quiz from './pages/Guides/Quiz'
import GuideDetails from './pages/Guides/GuideDetails'
import Profile from './pages/Profile/Profile'


function App() {
  const [loggedUser, setLoggedUser] = useState("");
  const csrftoken = Cookies.get('csrftoken');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/user', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        credentials: 'include',
        })
        .then((response) => response.json())
        .then((json) =>{
            json.user ? 
            setLoggedUser(json.user) :
            console.log(json.user)
        })
        .catch(error => console.log(error))
  }, [])

  return (
    <>
      <Context.Provider value={{ loggedUser, setLoggedUser}}>
      <Navbar />
      <div className='container items-center m-auto'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="guides/topic/:id" element={<Categories />} />
          <Route path="guides/topic/:id/Guide" element={<GuideDetails />} />
          <Route path="guides/topic/:id/Quiz" element={<Quiz />} />
          {/* </Route> */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/discussionForums" element={<DiscussionForum />} />
          <Route path="/post/create" element={loggedUser ? <PostForm /> : (<Navigate replace to="/login" />) } />
          <Route path="/post/:id" element={loggedUser ? <PostDetails />  : (<Navigate replace to="/login" />)} />
          <Route path="/post/update/:id" element={<PostForm />} />
          <Route path="/profile" element={!loggedUser ? (<Navigate replace to="/login" />) : (<Profile />) } />
          <Route path="/signup" element={loggedUser ? (<Navigate replace to="/" />) : (<SignUp />) } />
          <Route path="/login" element={loggedUser ? (<Navigate replace to="/" />) : <Login />} />
          <Route path="/logout" element={loggedUser ? (<LogoutModal />) : <Navigate replace to="/" />} />
        </Routes>
      </div>
      </Context.Provider>
    </>
  )
}

export default App
