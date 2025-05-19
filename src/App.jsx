import React from 'react'
import {BrowserRouter as Router ,Routes ,Route} from 'react-router-dom'
import UserContext from "./Context/UserContext.jsx";
import DataContext from "./Context/DataContext.jsx";
import Home from './Pages/Home.jsx';
import Requests from './Pages/Requests.jsx';
import Messages from './Pages/Messages.jsx';
import Notification from './Pages/Notification.jsx';
import Menu from './Pages/Menu.jsx';
import Login from './Pages/Unauthorized/Login.jsx';
import Register from './Pages/Unauthorized/Register.jsx';
import ForgetPassword from './Pages/Unauthorized/ForgetPassword.jsx';
import Profile from './Pages/Profile.jsx';
import Search from './Pages/Search.jsx';
import MessagesPersonal from './Pages/MessagesPersonal.jsx';

import { Toaster } from 'react-hot-toast';
import BlockedUser from './Pages/BlockedUser.jsx';
import PostEdit from './Pages/PostEdit.jsx';
import DetailsPost from './Pages/DetailsPost.jsx';
import Saved from './Pages/Saved.jsx';

const App = () => {
  return (
    <Router>
      <UserContext>
        <DataContext>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/requests' element={<Requests/>}/>
            <Route path='/messages' element={<Messages/>}/>
            <Route path='/messages/:id' element={<MessagesPersonal/>}/>
            <Route path='/notifications' element={<Notification/>}/>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/menu/Saves' element={<Saved/>}/>
            <Route path='/menu/blocked' element={<BlockedUser/>}/>
            <Route path='/menu/post-edit/:postId' element={<PostEdit/>}/>
            <Route path='/post/:postId' element={<DetailsPost/>}/>
            <Route path='/profile/:id' element={<Profile/>}/>
            <Route path='/search=/:data' element={<Search/>}/>

            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/forgot-password/:token' element={<ForgetPassword/>}/>
          </Routes>
        </DataContext>
      </UserContext>
      <Toaster position="top-center" reverseOrder={false}  toastOptions={{
          duration: 3000, // default for all toasts
        }} />
    </Router>
  )
}

export default App