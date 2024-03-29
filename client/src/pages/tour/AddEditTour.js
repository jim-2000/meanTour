import React, { useEffect, useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBBtn,
    MDBSpinner,

  } from "mdb-react-ui-kit";

  import ChipInput from "material-ui-chip-input";
  import FileBase from "react-file-base64";
  import { toast } from "react-toastify";
  import { useNavigate, useParams } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
    import { createTour, UpdateTour } from '../../redux/slice/tourSlice';
import MySpinner from '../../components/MySpinner';
import TourFooter from '../../components/TourFooter';

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
    const {id} = useParams();
    const {error,loading,user} = useSelector(state => state.auth);
    const {userTours} = useSelector(state => ({...state.tour}));

useEffect(() => {
    if (id) {
        const SingelTour =userTours.find((tour)=>tour._id === id);
        setTourData({...SingelTour})           
    }
}, [id])

    //
const handleSubmit = () => {
    //
    try {
        if (title && description  ) {       
        const updatedTourData = {...tourData,name:user?.result?.name,price:555,imageFile:imageFile};
            if (!id) {
                dispatch(createTour({updatedTourData, navigate, toast}));
            }else{
                dispatch(UpdateTour({id,updatedTourData, navigate, toast}));
            console.log(updatedTourData);

            }
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
if (loading) {
    return <MySpinner />;
}
  return (
    <div className='container'
    style={{
        margin:"auto",padding:"15px",maxWidth:"450px",alignContent:"center",marginTop:"120px"
    }}
    >
                        
        {
            loading && <MySpinner />
        }
                        

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
                            setTourData({ ...tourData, tags: [...tourData.tags, chip] });
                            // setTourData((prevState) => ({...prevState,tags:prevState.tags.concat(chip)}));
                        }}
                        onDelete={(chip,index)=>{
                            setTourData((prevState) => ({...prevState,tags:prevState.tags.filter((i)=>i!==chip)}));
                        }}
                        placeholder='Enter Tour Tags...'
                        style={{}}
                        variant='outlined'
                        fullWidth
                        
                        />
                    </div>
                    <div className='d-flex  justify-content-start'>
                        <FileBase 
                        key={"imageFile"}
                        name={"imageFile"}
                          type="file"
                          multiple={false}
                          onDone={({ base64 }) =>{
                            setTourData({ ...tourData, imageFile: base64 })
                         
                          }
                         
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
                        navigate('/')
                    }}
                    >Cancel</MDBBtn>
                    </div>
                </MDBValidation>
            </MDBCardBody>
            </MDBCard>
        <div className='my-5'>
            <TourFooter /> 
        </div>

    </div>
  )
}

export default AddEditTour