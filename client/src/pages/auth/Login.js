import React, { useEffect, useState } from 'react'
import { MDBCard,MDBCardBody,
    MDBInput,MDBCardFooter,
    MDBValidation,MDBBtn,
    MDBIcon,MDBSpinner
 } from 'mdb-react-ui-kit'

import { Link,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import { google, login } from '../../redux/slice/authSlice'
import  GoogleLogin  from 'react-google-login'

// state

 


//
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
     
    // dispatch and actions
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,error} = useSelector((state)=>state.auth);
 

    // event handaling
    const handleSubmit = (e) => {
        e.preventDefault();       
        if (email && password) {
           const  formValue = {
                email:email,
                password:password
            }        
            dispatch(login({formValue,navigate,toast}))
        }
    }
    const handleEmail =  (e) => {       
        setEmail( e.target.value);
    }
    const handlePassword=  (e) => {       
        setPassword( e.target.value); 
    }
    const googleSucces=  (response) => {   
        const email = response?.profileObj.email;
        const name = response?.profileObj.name;
        const token = response?.tokenId;
        const googleId = response?.googleId;
        const result = {email,name,token,googleId};
        
        console.log(response); 
        dispatch(google({result,navigate,toast}))
    }
    const googleFailure=  (err) => {       
        console.log(err);
    }

    //

// lifecycle methods
useEffect(() => {
 error && toast.error(error);
}, [error])


  return (
    <div style={{margin:"auto",padding:"15px",maxWidth:"450px",alignContent:"center",marginTop:"120px"}}>
        <MDBCard alignment='center' className='border p-5'>
            <MDBIcon fas icon='user-circle' className='fa-2x' />
            <h4  className="mt-3">Log in</h4>
            <MDBCardBody >
                <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3 mb-2'>
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
                        
                        style={{margin:"5px 0px"}}
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
                        style={{margin:"5px 0px"}}
                        validation="Please Provide your password"
                        />
                    </div>
                    <div className='col-12'>
                        <MDBBtn style={{width:"100%"}} 
                        color='dark'
                        type='submit'
                        
                        >
                            {
                            loading &&(
                                <MDBSpinner 
                                size='sm'
                                role={"status"}
                                tag="span"
                                className='me-2'
                                />
                            )  
                            }
                            L-O-G-I-N
                        </MDBBtn>
                    </div>

                </MDBValidation>
                <GoogleLogin 
                style={{
                    margin:"15px 0"
                }}
                clientId='345013306597-o6udqujhci826o0ssrm14sgo5me1pqa9.apps.googleusercontent.com'    
                render={(r)=>(
                    <MDBBtn className='' 
                    color='danger'
                    style={{width:"100%"}}
                    onClick={r.onClick}
                    disabled={r.disabled}
                    > 
                    <MDBIcon className='me-2' fab icon='google' />
                    Google sign In
                    </MDBBtn>
                )}
                onSuccess={googleSucces}
                onFailure={googleFailure}
                isSignedIn ={true}
                cookiePolicy={"single_host_origin"}

                />
            </MDBCardBody>
            <MDBCardFooter>
                <Link to={"/register"}>
                <p>Don't have an account ? Sign up</p>
                </Link>
            </MDBCardFooter>
        </MDBCard>
    </div>
  )
}

export default Login