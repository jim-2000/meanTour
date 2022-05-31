import axios from 'axios';
const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Content-type":"application/json"
    }
  };
const API_URL = 'http://localhost:4000/api/v1';
const API = axios.create({baseURL: API_URL,config});
//
API.interceptors.request.use((req)=>{
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem('profile')).token
        }`;
    }
    return req;
});

// hit the login url
export const ApiLogin = (formValue) => API.post("/tour/join/login/",formValue);
// hit the singup url
export const ApiSinup = (formValue) => API.post("/tour/join/signup/",formValue);
// GOOGLE AUTH
export const ApiGoogle = (result) => API.post("/tour/join/google/",result);

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<TOUR >>>>>>>>>>>>>>>>
// crate a tour
export const ApiCreateTour = (tourData) => API.post("/tour/",tourData);

// get all tourss
export const ApiGeteTour = () => API.get("/tour");


// get singel tour
export const ApiGetSingelTour = (id) => API.get(`/tour/singel/${id}`);


// get  tour by user id
export const ApiGetTourByUserID = (userId) => API.get(`/tour/user/tour/${userId}`);

// delete singel tour
export const ApiDeleteSingelTour = (id) => API.get(`/tour/delete/${id}`);
// update a tour
export const ApiUPDATETour = (updatedTourData,id) => API.patch(`/tour/update/${id}`,updatedTourData);
//  SEARCH TOUR 
export const ApiSearchByTour = (searchQuery)=>API.get(`/tour/search?searchQuery=${searchQuery}`) ;
 // get  tour by user id
export const ApiGetTourByTAG = (tag) => API.get(`/tour/tag/${tag}`);
 // get  tour by user id
 export const ApiGetRelatedTourByTAG = (tags) => API.post(`/tour/relatedTours/`,tags);



