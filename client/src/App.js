import React, { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
 import {ToastContainer} from 'react-toastify'
 import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './pages/blog/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/slice/authSlice'
import Header from './components/Header';
import {useSelector} from 'react-redux'
function App() {
  const {user}= useSelector(state => state.auth)
  const dispatch = useDispatch();
  const Isuser = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
     if (Isuser) {
      dispatch(setUser(Isuser));
     }
  }, [ ])
  
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer       
       autoClose={3000}
       position="top-right"
      />
      <Header />
      <Routes>
        {
          user?.result._id &&  (
            <Route path='/' element={<Home />} />
          ) 
        }
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
      </Routes>
    </div>    
    </BrowserRouter>
  );
}

export default App;
