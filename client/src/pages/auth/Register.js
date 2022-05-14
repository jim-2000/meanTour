import React, { useEffect, useState } from 'react'
import { MDBCard,MDBCardBody,
    MDBInput,MDBCardFooter,
    MDBValidation,MDBBtn,
    MDBIcon,MDBSpinner
 } from 'mdb-react-ui-kit'

import { Link,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import { signup } from '../../redux/slice/authSlice'

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Cpassword, setCPassword] = useState('');
   
  // dispatch and actions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading,error} = useSelector((state)=>state.auth);


  // event handaling
  const handleSubmit = (e) => {
      e.preventDefault();   
     
      // if (email.includes('@')) {
      //   return toast.error("Please provide valid email");
      // }
      if (password !== Cpassword ) {
        return toast.error("Password should match");
      }

      if (email && password && email.includes('@'))  {      
         const  formValue = {
              firstName:firstname,
              lastName:lastName,
              email:email,
              password:password
          }        
          console.log(formValue);
          dispatch(signup({formValue,navigate,toast}))
      }else{
        return toast.error("Please provide valid email");

      } 
  }
  const handleFirst =  (e) => {       
    setFirstname( e.target.value);
}
const handleLast =  (e) => {       
  setLastName( e.target.value);
}
  const handleEmail =  (e) => {
    setEmail( e.target.value);    
  }
  const handlePassword=  (e) => {       
      setPassword( e.target.value); 
  }
  const handleConfirmPassword=  (e) => {       
    setCPassword( e.target.value); 
  }
  return (
    <div style={{margin:"auto",padding:"15px",maxWidth:"450px",alignContent:"center",marginTop:"120px"}}>
    <MDBCard alignment='center'>
        <MDBIcon fas icon='user-circle' className='fa-2x ' />
        <h4  className="mt-3">SIGN UP NOW </h4>
        <MDBCardBody >
            <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
            <div className='col-md-6 '>
                    <MDBInput 
                    label=" First Name "
                    type={"text"}
                    name="firstname"
                    value={firstname}
                    onChange= {
                        handleFirst
                    }
                    required
                    
                    style={{margin:"10px 0px"}}
                    />                        
                </div>
                <div className='col-md-6 '>
                    <MDBInput 
                    label=" Last Name "
                    type={"text"}
                    name="lastname"
                    value={lastName}
                    onChange= {
                        handleLast
                    }
                    required
                    
                    style={{margin:"10px 0px"}}
                    />                        
                </div>
                <div className='col-md-12 '>
                    <MDBInput 
                    label=" Email "
                    type={"email"}
                    name="email"
                    value={email}
                    onChange= {
                        handleEmail
                    }
                    required
                    
                    style={{margin:"10px 0px"}}
                    />                        
                </div>
                <div className='col-md-12 '>
                    <MDBInput 
                    label=" Password "
                    type={"password"}
                    name="password"
                    value={password}
                    onChange= {
                        handlePassword
                    } 
                    required
                    style={{margin:"10px 0px"}}
                    validation="Please Provide your password"
                    />
                </div>
                <div className='col-md-12 '>
                    <MDBInput 
                    label=" Confirm Password "
                    type={"password"}
                    name="confirm password"
                    value={Cpassword}
                    onChange= {
                        handleConfirmPassword
                    } 
                    required
                    style={{margin:"10px 0px"}}
                    validation="Please Provide your password"
                    />
                </div>
                <div className='col-12'>
                    <MDBBtn style={{width:"100%"}} 
                    color='dark'
                    type='submit'
                    
                    >
                        S - U - B - M - I - T 
                    </MDBBtn>
                </div>

            </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
            <Link to={"/login"}>
            <p>all rady have an account ? login now</p>
            </Link>
        </MDBCardFooter>
    </MDBCard>
</div>
  )
}

export default Register