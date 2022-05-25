import React, { useEffect, useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBBtn,

  } from "mdb-react-ui-kit";

  import ChipInput from "material-ui-chip-input";
  import FileBase from "react-file-base64";
  import { toast } from "react-toastify";
  import { useNavigate, useParams } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
import { createTour } from '../../redux/slice/tourSlice';

  //

  let initialState = {
    title: "",
    description: "",
    destination:"",
    duration: 2,
    maxGroupSize: 2,
    price:0.00,
    creator:"",
    imageFile: "",
    tags: [],
  }
const AddEditTour = () => {
    const [tourData, setTourData] = useState(initialState);
    const {title,description,duration,maxGroupSize,tags,destination,imageFile} = tourData;
    const tourDuration =[3,5,7,10,15,20,30];
    const tourmaxGroupSize =[3,5,7,10,15,20,30,50,100];
//
const dispatch = useDispatch();
const navigate = useNavigate();
const {error,loading,user} = useSelector(state => state.auth);
// const {user} = useSelector(state => state.tour);


    //
const handleSubmit = () => {
    //
    try {
        if (title && description && destination && duration && maxGroupSize ) {
            // setTourData({...tourData,creator:user.result.name,price:555});                   
            // dispatch(createTour({tourData, navigate, toast}));
        const updatedTourData = {...tourData,name:user.result.name,price:555};
        dispatch(createTour({updatedTourData, navigate, toast}));
        }else{
            toast.error("Please fill all the fields");
        }
       
    handleclear();
   } catch (error) { 
      toast.error(error.message);
   }
    
}
const onInputChange = (e) => {
    //
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setTourData((prevState) => ({
        ...prevState,
        [name]: value,
    }));
    // console.log(tourData);
}
 
//
const handleclear = () => {
    //
    setTourData(initialState);
    
}
//
 
useEffect(() => {

  error &&  toast.error(error);
}, [error])

  return (
    <div className='container'
    style={{
        margin:"auto",padding:"15px",maxWidth:"450px",alignContent:"center",marginTop:"120px"
    }}
    >
          <MDBCard alignment='center' className='border p-2'>           
            <h4  className="mt-3">Add Tour</h4>
            <MDBCardBody >
                <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3 mb-2'>
                    <div className='col-md-12 '>
                        <input
                        placeholder='Enter Tour Title...'
                        value={title}
                        onChange={onInputChange}
                        className='form-control'
                        required
                        name='title'                                           
                        />

                    </div>
                    <div className='col-md-12 '>
                        <textarea
                        placeholder='Enter Tour Description..........'
                        value={description}
                        onChange={onInputChange}
                        className='form-control'
                        required
                        name='description'                  
                        style={{
                            height:'100px',
                            border:'1px solid orange',
                        }}                         
                        />
                        
                    </div>
                    <div className='col-md-12 '>
                        <input
                        placeholder='Enter Tour destination..........'
                        value={destination}
                       onChange={onInputChange}
                        // onChange={(e)=>{
                        //     setTourData((prevState)=>({...prevState,destination:e.target.value}));                         
                        // }}
                        className='form-control'
                        required
                        name='destination'                  
                        style={{
                       
                        }}                         
                        />
                        
                    </div>
                    <div className='col-md-6 '>
                        <select className='browser-default custom-select'
                       onChange={onInputChange}
                       name='duration'
                       //  onChange={(e)=>{
                        //      if (e.target.value !=="Select Tour Duration") {
                        //          setTourData((prevState) => ({...prevState,duration:e.target.value}));
                        //      }
                        //  }}
                         style={{
                                border:'1px solid green',
                                borderRadius:'5px',
                                padding:'5px',
                                backgroundColor:'skyblue',
                         }}
                        >
                            <option defaultValue={"Select Tour Duration"}>Select Tour Duration</option>
                            {
                                tourDuration.map((duration,index)=>{
                                    return(
                                        <option
                                        key={index}
                                        value={duration}
                                       
                                        >{duration}</option>
                                    )
                                })
                            }
                           
                        </select>
                    </div>
                    <div className='col-md-6 '>
                        <select className='browser-default custom-select'
                        onChange={onInputChange}
                        name='maxGroupSize'
                        //  onChange={(e)=>{
                        //      if (e.target.value !=="Select Tour Size") {                             
                        //         setTourData((prevState) => ({...prevState,maxGroupSize:e.target.value}));
                        //      }
                             
                        //  }}
                         style={{
                            border:'1px solid green',
                            borderRadius:'5px',
                            padding:'5px',
                            backgroundColor:'skyblue',
                     }}
                        >
                            <option defaultValue={"Select Tour Duration"}>Select Tour Size</option>
                            {
                                tourmaxGroupSize.map((size,index)=>{
                                    return(
                                        <option
                                        key={index}
                                        value={size}    
                                        style={{
                                            border:'1px solid green',
                                            borderRadius:'5px',
                                            padding:'5px',
                                            backgroundColor:'pink',
                                     }}                                   
                                        >{size}</option>
                                    )
                                })
                            }
                           
                        </select>
                    </div>

                    <div className='col-md-12 '>
                        <ChipInput 
                        name='tags'
                        value={tags}
                        onAdd={(chip)=>{
                            setTourData((prevState) => ({...prevState,tags:prevState.tags.concat(chip)}));
                        }}
                        onDelete={(chip,index)=>{
                            setTourData((prevState) => ({...prevState,tags:prevState.tags.filter((i)=>i!==index)}));
                        }}
                        placeholder='Enter Tour Tags...'
                        style={{}}
                        variant='outlined'
                        fullWidth
                        
                        />
                    </div>
                    <div className='d-flex  justify-content-start'>
                        <FileBase 
                          type="file"
                          multiple={false}
                          onDone={({ base64 }) =>
                            setTourData({ ...tourData, imageFile: base64 })
                          }
                        />
                    </div>
                    <div className='col-md-12 '>
                    <MDBBtn style={{
                        width:'100%',

                    }}
                    color='success'
                    
                    > Submit</MDBBtn>
                    <MDBBtn
                    style={{
                        width:'100%',
                        
                    }}
                    className='mt-2 '
                    color='danger'
                    onClick={()=>{
                        handleclear();
                    }}
                    >Cancel</MDBBtn>
                    </div>
                </MDBValidation>
            </MDBCardBody>
            </MDBCard>

    </div>
  )
}

export default AddEditTour