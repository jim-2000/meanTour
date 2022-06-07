import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBSpinner, MDBTypography } from 'mdb-react-ui-kit'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setlogOut } from '../../redux/slice/authSlice';
import { getTour, setCurrentPage } from '../../redux/slice/tourSlice';
import { Link, useLocation } from 'react-router-dom'
import CardTour from '../../components/cardTour';
import MySpinner from '../../components/MySpinner';
import Pagination from '../../components/Pagination';
import TourFooter from '../../components/TourFooter';

// query function

const useQuery = ()=>{
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const {tours,loading,currentPage,numberOfPages} = useSelector((state)=>({...state.tour,}));

  const query = useQuery();
  const searchQuery = query.get("searchQuery");
 
  const location = useLocation();




  //
    useEffect(()=>{
      dispatch(getTour(Number(currentPage)));   
    },[currentPage])


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

     }} className="mb-3">
      <MDBRow className='mt-5'>
        
        {
          tours.length === 0  && location.pathname !== "/" && (
            <MDBTypography classID='text-center mb-0' tag={"h2"}>
            We couldn't find any mathces for this {searchQuery} 
            </MDBTypography>
          )
        }
        <>
          <MDBContainer >
            <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
              {
              tours && tours.map((item)=> <CardTour  key={item._id} {...item} /> )
              }
            </MDBRow>
          </MDBContainer>
        </>
      </MDBRow>
      <div className='my-3'>
        {tours.length > 0 &&  !searchQuery  && (
          <Pagination
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          dispatch={dispatch}        
          />
          )}
      </div>
  
     <div className='mt-3'>
       <TourFooter /> 
     </div>
   </div>
  )
}

export default Home