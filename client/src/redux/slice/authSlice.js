import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'
// auth state
const initialState = {
    isAuthenticated: false,
    user:null,
    error:"",
    loading:false,
}


// async thunk 
// login >>>>>>>>>>>>>>>>>>
export const login = createAsyncThunk(
    "auth/login",
    async ({ formValue, navigate, toast }, { rejectWithValue }) => {
      try {
        const response = await api.ApiLogin(formValue);
        toast.success(response.data['meassage'], {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        navigate("/");
        return response.data;
      } catch (err) {
        toast.error(err.response.data['meassage'].toString());
        
        return rejectWithValue(err.response.data);
      }
    }
);
// SIGN UP .............>>>>>>>>>>>>>>>>>>
export const signup = createAsyncThunk(
    "auth/signup",
    async ({ formValue, navigate, toast }, { rejectWithValue }) => {
      try {
        const response = await api.ApiSinup(formValue);
        toast.success(response.data['meassage'], {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        navigate("/");
        return response.data;
      } catch (err) {
        toast.error(err.response.data['meassage'].toString());
        
        return rejectWithValue(err.response.data);
      }
    }
);
// GOOGLE AUTH .................>>>>>>>>>>>>>>

export const google = createAsyncThunk(
  "auth/google",
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.ApiGoogle(result);
      toast.success("Successfully Google auth Done", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      navigate("/");
      return response.data;
    } catch (err) {
      toast.error(err.response.data['meassage'].toString());
      
      return rejectWithValue(err.response.data);
    }
  }
);









// auth Slice
const authSlice = createSlice({
 name: 'auth',
 initialState,
 reducers: {
   setUser:(state,action) => {
    state.loading = false
    state.error =""  
    state.user = action.payload  
    state.isAuthenticated = true     
  },
  setlogOut:(state,action) => {
    localStorage.clear()
    window.sessionStorage.clear()
    state.user = null
    state.isAuthenticated = false     
  },
 },
 //   handle actions in your reducers:
 extraReducers:{
     [login.pending]:(state,action) => {
         state.loading = true         
     },
     [login.fulfilled]:(state,action) => {
        state.loading = false
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.error =""  
        state.user = action.payload       
        state.isAuthenticated = true
    },
    [login.rejected]:(state,action) => {
        state.loading = false 
        state.error =action.payload.meassage       
    },
    [signup.pending]:(state,action) => {
        state.loading = true         
    },
    [signup.fulfilled]:(state,action) => {
       state.loading = false
       localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
       state.error =""  
       state.user = action.payload       
       state.isAuthenticated = true
   },
   [signup.rejected]:(state,action) => {
       state.loading = false 
       state.error =action.payload.meassage       
   }
   ,
    [google.pending]:(state,action) => {
        state.loading = true         
    },
    [google.fulfilled]:(state,action) => {
       state.loading = false
       localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
       state.error =""  
       state.user = action.payload       
       state.isAuthenticated = true
   },
   [google.rejected]:(state,action) => {
       state.loading = false 
       state.error =action.payload.meassage       
   }
 }

});

export const {setUser,setlogOut} = authSlice.actions;


export default authSlice.reducer;