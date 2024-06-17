
import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Pages/Home'
import About from './Pages/About'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import Header from './Component/Header'
import  Footer from './Component/Footer'
import Privateroute from './Component/Privateroute'
import OnlyAdminPrivateRoute from './Component/OnlyAdminPrivateroute'
import CreatePost from './Pages/CreatePost'
import UpdatePost from './Pages/UpdatePost'
import PostPage from './Pages/PostPage'
import ScrollToTop from './Component/ScrollToTop'
import Search from './Pages/Search'
const App = () => {
  return (
  
    <BrowserRouter>
    <ScrollToTop/>
    <Header/> 
      <Routes>
        <Route  path="/" element={< Home/>}/>
        <Route  path="/about" element={< About/>}/>
        <Route  path="/sign-in" element={< Signin/>}/>
        <Route  path="/sign-up" element={< Signup/>}/>
        <Route  path="/search" element={< Search/>}/>
        <Route element=<Privateroute/>>
        <Route  path="/dashboard" element={< Dashboard/>}/>
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
        <Route  path="/create-post" element={< CreatePost/>}/>
        <Route  path="/update-post/:postId" element={< UpdatePost/>}/>
        </Route>
        <Route  path="/post/:postSlug" element={<PostPage />}/>
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
