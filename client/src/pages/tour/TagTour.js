import React, { useEffect } from 'react'
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { TagTours } from '../../redux/slice/tourSlice';
import MySpinner from '../../components/MySpinner';
const TagTour = () => {
    const { tag } = useParams();
    const dispatch =  useDispatch();
    const navigate = useNavigate();
    const {tagTours,loading} = useSelector((state)=>state.tour);
  //
    const excerpt = (str,max)=>{
      if (str.length >max) {
        str = str.substring(0,45)+ "....";      
      }
      return str;
    }
  //
  useEffect(()=>{ 
      if (tag) {
        dispatch(TagTours(tag));
      }
      
    },[tag])

    //
    if (loading) {
      return <MySpinner />
    }

  return (
    <div
    style={{
      margin: "auto",
      padding: "120px",
      maxWidth: "900px",
      alignContent: "center",
      backgroundColor:"gray"
    }}
  >
    <h3 className="text-center">Tours with tag: {tag}</h3>
    <hr style={{ maxWidth: "570px" }} />
    {tagTours &&
      tagTours.map((item) => (
        <MDBCardGroup key={item._id}>
          <MDBCard style={{ maxWidth: "600px" }} className="mt-2 p-2 hover-shadow">
            <MDBRow className="g-0">
              <MDBCol md="4">
                <MDBCardImage
                  className="rounded img-fluid "
                  src={item.imageFile}
                  alt={item.title}
                  style={{
                    maxWidth: "100%",
                    minHeight:"200px"
                  }}
                />
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody>
                  <MDBCardTitle className="text-start">
                    {item.title}
                  </MDBCardTitle>
                  <MDBCardText className="text-start">
                    {excerpt(item.description, 40)}
                  </MDBCardText>
                  <div style={{ float: "left", marginTop: "-10px" }}>
                    <MDBBtn
                      size="md"
                      rounded
                      color="info"
                      onClick={() => navigate(`/tour/${item._id}`)}
                    >
                      Read More
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCardGroup>
      ))}
  </div>
  )
}

export default TagTour