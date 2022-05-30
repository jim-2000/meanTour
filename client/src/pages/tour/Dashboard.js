import React,{useEffect} from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBSpinner } from 'mdb-react-ui-kit'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteATour, getTourByUser } from '../../redux/slice/tourSlice'
import './styles/dashboard.css';
import MySpinner from '../../components/MySpinner'
import { toast } from 'react-toastify'

//
const Dashboard = () => {
    const {user} = useSelector((state)=>state.auth);
    const {userTours,loading} = useSelector((state)=>state.tour);
  const userId = user?.result._id;
   const dispatch= useDispatch();
//
useEffect(()=>{
    if (userId) {      
        dispatch(getTourByUser(userId));
    }
},[userId])
const excerpt = (str,max)=>{
  if (str.length >max) {
    str = str.substring(0,45)+ "....";      
  }
  return str;
}
const handleDelete = (id)=>{
  // if (window.confirm("Are you sure you want to delete this post ?")) {
  // }
  dispatch(DeleteATour({id,toast}))    
}

  return (  
    <div style={{
      margin:"auto",
      padding:"120px",
      maxWidth:`900px`,
      alignContent:"center"      
    }}>
      <h4 className='text-center'>Dashboard:{user?.result?.name}</h4>
      {userTours.length === 0 && (
        <h3>No tour available with the user: {user?.result?.name}</h3>
      )}      
      {
        loading &&(
            <MySpinner />
        )  
      }
      {
        userTours && userTours.map((item)=>(
          <MDBCardGroup key={item._id}>
          <MDBCard style={{ maxWidth: "900px" }} className="mt-2">
            <MDBRow className="g-0">
              <MDBCol md="4">
                <MDBCardImage
                  className="rounded"
                  src={item.imageFile}
                  alt={item.title}
                  fluid
                />
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody>
                  <MDBCardTitle className="text-start">
                    {item.title}
                  </MDBCardTitle>
                  <MDBCardText className="text-start">
                    <small className="text-muted">
                      {excerpt(item.description,20)}
                    </small>
                  </MDBCardText>
                  <div
                    style={{
                      marginLeft: "5px",
                      float: "right",
                      marginTop: "-60px",
                    }}
                  >
                    <MDBBtn className="mt-4" tag="a" color="none">
                      <MDBIcon
                        fas
                        icon="trash"
                        style={{ color: "#dd4b39" }}
                        size="lg"
                        onClick={() => handleDelete(item._id)}
                      />
                    </MDBBtn>
                    <Link to={`/editTour/${item._id}`}>
                      <MDBIcon
                        fas
                        icon="edit"
                        style={{ color: "#55acee", marginLeft: "10px" }}
                        size="lg"
                      />
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCardGroup>
        ))
      }
    </div>   
  )
}

export default Dashboard 