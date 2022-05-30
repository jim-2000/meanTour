import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5)
    const navigate = useNavigate();




    //
    useEffect(()=>{
        const interval = setInterval(() => {
            setCount((p)=>--p);
        }, 1000);
        count === 0 && navigate("/login")
        return ()=> clearInterval(interval);
    },[count,navigate])
  return (
    <div style={{
        margin:"auto",
        padding:"120px",
        maxWidth:`900px`,
        alignContent:"center",
        backgroundColor:"GrayText",  
    }}>
        Redirecting you in {count} in login page
    </div>
  )
}

export default LoadingToRedirect