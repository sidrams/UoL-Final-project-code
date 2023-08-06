// import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Searchbar } from './components/SearchBar/SearchBar'
import "./components/Styles/styles.css" 
import Home from './pages/Home/Home'
import Guides from './pages/Guides/Guides'
import FAQ from './pages/FAQs/FAQ'
import DiscussionForum from './pages/DiscussionForum/DiscussionForum'
import SignUp from './pages/SignUp/SignUp'


function App() {
  // const [count, setCount] = useState(0)
  let Component
  switch (window.location.pathname) {
    case "/":
      Component = Home
      break
    case "/guides":
      Component = Guides
      break
    case "/faq":
      Component = FAQ
      break
    case "/discussionForums":
      Component = DiscussionForum
      break
    case "/signup":
      Component = SignUp
      break
    case "/login":
      Component = SignUp
      break
  }
  return (
    <>
      <Navbar />
      <div className='container'>
        <Component />
      </div>
      <Searchbar />
    </>
  )
}

export default App
