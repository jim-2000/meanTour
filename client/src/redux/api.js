import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1';
const API = axios.create({baseURL: API_URL});
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






