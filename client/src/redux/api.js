import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1';
const API = axios.create({baseURL: API_URL});

// hit the login url
export const ApiLogin = (formValue) => API.post("/blogs/join/login/",formValue);
// hit the singup url
export const ApiSinup = (formValue) => API.post("/blogs/join/signup/",formValue);
// GOOGLE AUTH
export const ApiGoogle = (result) => API.post("/blogs/join/google/",result);













