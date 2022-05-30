import React, { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
 import {ToastContainer} from 'react-toastify'
 import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './pages/tour/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/slice/authSlice'
import Header from './components/Header';
import {useSelector} from 'react-redux'
import AddEditTour from './pages/tour/AddEditTour';
import { getTour } from './redux/slice/tourSlice';
import Singeltour from './pages/tour/Singeltour';
import DetailsTour from './pages/tour/DetailsTour';
import Dashboard from './pages/tour/Dashboard';
import PrivateRoute from './components/PrivateRoute';
function App() {
  const {user}= useSelector(state => state.auth)
  const dispatch = useDispatch();
  const Isuser = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
     if (Isuser) {
      dispatch(setUser(Isuser));
      dispatch(getTour());
     }
  }, [ ])
  
  return (
    <BrowserRouter 
    >
    <div className="App">
      <ToastContainer       
       autoClose={3000}
       position="top-right"
      />
  
      <Header />
      <Routes >      
          <Route exact path='/' element={<Home />} />,
          <Route path='/addTour' element={
          <PrivateRoute>
            <AddEditTour />
          </PrivateRoute>
          }/>        
          <Route path='/editTour/:id' element={
            <PrivateRoute>
              <AddEditTour />
            </PrivateRoute>
          } />        
          <Route path='/tour/:id' element={<Singeltour />} />        
          <Route path='/dashboard'  element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />  
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
      </Routes>
    </div>    
    </BrowserRouter>
  );
}

export default App;
