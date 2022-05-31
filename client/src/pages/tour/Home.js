import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBSpinner, MDBTypography } from 'mdb-react-ui-kit'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setlogOut } from '../../redux/slice/authSlice';
import { getTour } from '../../redux/slice/tourSlice';
import { Link } from 'react-router-dom'
import CardTour from '../../components/cardTour';
import MySpinner from '../../components/MySpinner';

const Home = () => {
  const dispatch = useDispatch();
  const {tours,loading,tour} = useSelector((state)=>({...state.tour}));
//
useEffect(()=>{
  dispatch(getTour());
},[])


  //
   if (loading) {
     return <MySpinner /> 
   }
  return (
    
   <div style={{
    margin: "auto",
    padding: "15px",
    maxWidth: "1000px",
    alignContent: "center",
     }}>
      <MDBRow className='mt-5'>
        
        {
          tours.length === 0 && (
            <MDBTypography classID='text-center mb-0' tag={"h2"}>
              No Tours Found
              it's loading..
            </MDBTypography>
          )
        }
        <>
          <MDBContainer >
            <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
              {
              tours && tours.map((item,index)=> <CardTour  key={item._id} {...item} /> )
              }
            </MDBRow>
          </MDBContainer>
        </>
      </MDBRow>
     
   </div>
  )
}

export default Home