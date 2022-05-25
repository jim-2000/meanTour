import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";



const CardTour = ({imageFile,description,title,tags,_id,name}) => {
  const tour = {imageFile,description,title,tags,_id,name};
  const excerpt = (str,max)=>{
    if (str.length >max) {
      str = str.substring(0,45)+ "....";      
    }
    return str;
  }
  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem", padding:"0 2px" }}>
            <MDBCardImage
            src={imageFile}
            alt={title}
            position="top"
            style={{maxWidth:"100%", height:"180px"}}
            />
            <div className="top-left">{name}</div>
            <span className="text-start tag-card">
            {tags.map((tag) => (
            <Link to={`/tours/tag/${tag}`}> #{tag}</Link>
          ))}
            </span>
            <MDBCardBody>
              <MDBCardTitle className="text-start">{excerpt(title,15)}</MDBCardTitle>
              <MDBCardText className="text-start">{excerpt(description,65)}
                <Link to={`/tour/${_id}`} >
                  Read More
                </Link>
              {/* <Link to={{
                pathname:"/tour/details/",                                
              }}
              {...tour}           
              >
                Detials
              </Link> */}
            </MDBCardText>

            </MDBCardBody>
        </MDBCard>
    </MDBCardGroup>
  )
}

export default CardTour