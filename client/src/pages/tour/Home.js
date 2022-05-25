import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setlogOut } from '../../redux/slice/authSlice';
import { getTour } from '../../redux/slice/tourSlice';
import { Link } from 'react-router-dom'
import CardTour from '../../components/cardTour';

const Home = () => {
  const dispatch = useDispatch();
  const {tours,loading,tour} = useSelector((state)=>({...state.tour}));
//
useEffect(()=>{
  dispatch(getTour());
  console.log(tours.length);
  console.log(tour);
},[])


  //
   if (loading) {
     return <h4>loading..</h4>
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
        <MDBCol>
          <MDBContainer >
            <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
              {
              tours && tours.map((item,index)=> <CardTour key={index} {...item} /> )}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
     
   </div>
  )
}

export default Home