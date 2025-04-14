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

const App = () => {
  return (
    <Router>
      <UserContext>
        <DataContext>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/requests' element={<Requests/>}/>
            <Route path='/messages' element={<Messages/>}/>
            <Route path='/notifications' element={<Notification/>}/>
            <Route path='/menu' element={<Menu/>}/>

            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/forgot-password' element={<ForgetPassword/>}/>
          </Routes>
        </DataContext>
      </UserContext>
    </Router>
  )
}

export default App