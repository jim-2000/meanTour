import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBSpinner, MDBTypography } from 'mdb-react-ui-kit'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setlogOut } from '../../redux/slice/authSlice';
import { getTour, setCurrentPage } from '../../redux/slice/tourSlice';
import { Link, useLocation } from 'react-router-dom'
import CardTour from '../../components/cardTour';
import MySpinner from '../../components/MySpinner';
import Pagination from '../../components/Pagination';

const Home = () => {
  const dispatch = useDispatch();
  const {tours,loading,currentPage,numberOfPages} = useSelector((state)=>({...state.tour}));

  // const query = useQuery();
  // const searchQuery = query.get("searchQuery");
  const searchQuery = "searchQuery";
  const location = useLocation();




  //
    useEffect(()=>{
      dispatch(getTour(currentPage));
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
      {tours.length > 0 && !searchQuery && (
        <Pagination
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          dispatch={dispatch}
        />
      )}
     
   </div>
  )
}

export default Home