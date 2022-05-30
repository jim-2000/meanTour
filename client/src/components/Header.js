import React, { useState } from 'react'
import { 
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
 } from 'mdb-react-ui-kit'
 import { useDispatch, useSelector } from 'react-redux'
import { setlogOut } from '../redux/slice/authSlice'
import { useNavigate } from 'react-router-dom'
import { SearchTour } from '../redux/slice/tourSlice';
//
const Header = () => {
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState('')
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
//
const handleSubmit= (e)=>{
  e.preventDefault();
  if (search) {
    dispatch(SearchTour(search));
    navigate(`/tour/search?searchQuery=${search}`)
    setSearch("");
  }else{
    navigate("/")
  }
}
  //
  return (
    <MDBNavbar fixed='top' expand='lg' style={{backgroundColor:"#f0e6ea"}}>
      <MDBContainer fluid  >
        <MDBNavbarBrand
            href="/"
            style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}
          >
            Touropedia
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#606080" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
              {
                user?.result._id &&  (
                  <h6 style={{color:"#606080", fontWeight:"900",marginTop:"20px"}}>{user.result.name}</h6>
                )
              }

              {
                user ?.result?._id ?  (
                  <>
                    <MDBNavbarItem>
                      <MDBNavbarLink href="/">
                        <p className="header-text" style={{color:"#606080"}} >Home</p>
                      </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                      <MDBNavbarLink href="/addTour">
                        <p className="header-text" style={{color:"#606080"}} >Add Tour</p>
                      </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                      <MDBNavbarLink href="/dashboard">
                        <p className="header-text" style={{color:"#606080"}} >Dashboard</p>
                      </MDBNavbarLink>
                    </MDBNavbarItem>
                  
                  <MDBNavbarItem>
                    <MDBNavbarLink
                    href="/login"
                    onClick={() => dispatch(setlogOut())}
                    >
                      <p className="header-text" style={{color:"#606080"}} >
                        Logout
                      </p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              ) : (
                <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/login" style={{color:"#606080"}} >
                    <p className="header-text">Login</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                </>
              )
              }
             
             
          </MDBNavbarNav>
          <form className="d-flex input-group w-auto" onSubmit={handleSubmit} >
            <input
              type="text"
              className="form-control"
              placeholder="Search Tour"
              value={search}
              onChange={(e) => {setSearch(e.target.value)}}
            />
            <div style={{ marginTop: "5px", marginLeft: "5px" }}>
              <MDBIcon fas icon="search" />
            </div>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}

export default Header