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
import { useNavigate } from 'react-router-dom'
import { LikeTour, SearchTour } from '../redux/slice/tourSlice';


const CardTour = ({imageFile,description,title,tags,_id,name,likes}) => {
  const {user} = useSelector((state)=>({...state.auth}));
  const dispatch = useDispatch()

  //
  const userId = user?.result?._id || user?.result?.googleId;
  const excerpt = (str,max)=>{
    if (str.length >max) {
      str = str.substring(0,45)+ "....";      
    }
    return str;
  }
  //
  const Likes = ()=>{
    if (likes.length > 0) {
      return likes.find((like)=> like===userId) ? 
    ( 
      <>
      <MDBIcon far icon="thumbs-up" size="1x" />
      &nbsp;
      {likes.length> 2 ?(
        <MDBTooltip tag={"a"} title={`you and ${likes.length-1} others`}>
          {likes.length}
        </MDBTooltip>
      ):(
        `${likes.length} Like${likes.length > 2 ? 's' :''}`
      )}
      </> 
    ) : (
      <>
        <MDBIcon far icon="thumbs-up" size="1x" />
        &nbsp;{likes.length} {likes >2 ? 'Like' :'Likes'}
      </>
    )
    }
    return (
      <>
        <MDBIcon far icon="thumbs-up" size="1x" />
      </>
    )
  }
  const handleLike = ()=>{
    dispatch(LikeTour({_id}))
  }
  return (
    <MDBCardGroup>
      <MDBCard  className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem", padding:"0 2px" }}>
            <MDBCardImage
            src={imageFile}
            alt={title}
            position="top"
            style={{maxWidth:"100%", height:"180px"}}
            />
            <div className="top-left">{name}</div>
            <span className="text-start tag-card">
            {tags.map((tag) => (
            <Link to={`/tag/${tag}`} > #{tag}</Link>
          ))}
            <MDBBtn 
             color="none"
            style={{float:"right"}} tag={"a"} onClick={handleLike}>
                <Likes />
            </MDBBtn>
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