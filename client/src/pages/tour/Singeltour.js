import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingelTour, RelatedTours } from '../../redux/slice/tourSlice'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBContainer, MDBIcon } from 'mdb-react-ui-kit'
import moment from "moment";
import MySpinner from '../../components/MySpinner'
import RelatedTagTours from '../../components/RelatedTours'
 
const Singeltour = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const dispatch = useDispatch();
  const { loading,tour,relatedTours} = useSelector((state)=>({...state.tour}));
  const tags = tour?.tags;
//
useEffect(()=>{   
  tags &&  dispatch(RelatedTours(tags));    
},[tags])
//
useEffect(()=>{
  if (id) {
    dispatch(getSingelTour(id));
  } 
},[id])
  //
  if (loading) {
    return <MySpinner />
  }
  return (
    <div>
    <MDBContainer>
      <MDBCard className="mb-3 mt-2">
        <MDBCardImage
          position="top"
          style={{ width: "100%", maxHeight: "600px" }}
          src={tour.imageFile}
          alt={tour.title}
        />
        <MDBCardBody>
          <MDBBtn
            tag="a"
            color="none"
            style={{ float: "left", color: "#000" }}
            onClick={() => navigate("/")}
          >
            <MDBIcon
              fas
              size="lg"
              icon="long-arrow-alt-left"
              style={{ float: "left" }}
            />
          </MDBBtn>
          <h3>{tour.title}</h3>
          <span>
            <p className="text-start tourName">Created By: {tour.name}</p>
          </span>
          <div style={{ float: "left" }}>
            <span className="text-start">
              {tour && tour.tags && tour.tags.map((item) => `#${item} `)}
            </span>
          </div>
          <br />
          <MDBCardText className="text-start mt-2">
            <MDBIcon
              style={{ float: "left", margin: "5px" }}
              far
              icon="calendar-alt"
              size="lg"
            />
            <small className="text-muted">
              {moment(tour.createdAt).fromNow()}
            </small>
          </MDBCardText>
          <MDBCardText className="lead mb-0 text-start">
            {tour.description}
          </MDBCardText>
        </MDBCardBody>
        <div>
          <RelatedTagTours relatedTours={relatedTours} tourId={id} />    
        </div>
      </MDBCard>
      {/* <DisqusThread id={id} title={tour.title} path={`/tour/${id}`} /> */}
    </MDBContainer>
  </div>
  );
}

export default Singeltour