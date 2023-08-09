// import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import "./components/Styles/styles.css" 
import Home from './pages/Home/Home'
import Guides from './pages/Guides/Guides'
import FAQ from './pages/FAQs/FAQ'
import DiscussionForum from './pages/DiscussionForum/DiscussionForum'
import SignUp from './pages/SignUp/SignUp'
import { Route, Routes } from 'react-router-dom'


function App() { 
  return (
    <>
    <h1>hello</h1>
      <Navbar />
      <div className='container items-center m-auto'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/discussionForums" element={<DiscussionForum />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignUp />} />
        </Routes>
      </div>
    </>
  )
}

export default App
