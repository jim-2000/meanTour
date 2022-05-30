import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'


// CREATING A TOUR .............>>>>>>>>>>>>>>>>>>
export const createTour = createAsyncThunk(
    "tour/create",
    async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
      try {
        const response = await api.ApiCreateTour(updatedTourData);
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
// All tour .............>>>>>>>>>>>>>>>>>>
export const getTour = createAsyncThunk(
    "tour/getTour",
    async (_,{ rejectWithValue }) => {
      try {
        const response = await api.ApiGeteTour();       
        return response.data;
      } catch (err) {    
        return rejectWithValue(err.response.data);
      }
    }
);

// SINGEL TOUR BY ID 


export const getSingelTour = createAsyncThunk(
  "tour/getSingelTour",
  async (id,{ rejectWithValue }) => {
    try {
      const response = await api.ApiGetSingelTour(id);       
      return response.data;
    } catch (err) {    
      return rejectWithValue(err.response.data);
    }
  }
);
// GET TOUR BY USER ID
export const getTourByUser = createAsyncThunk(
  "tour/getTourByUser",
  async (userId,{ rejectWithValue }) => {
    try {
      const response = await api.ApiGetTourByUserID(userId);       
      return response.data;
    } catch (err) {    
      return rejectWithValue(err.response.data);
    }
  }
);


// DELETE TOUR

export const DeleteATour = createAsyncThunk(
  "tour/deleteATour",
  async (id,{ rejectWithValue }) => {
    try {
      const response = await api.ApiDeleteSingelTour(id);       
      return response.data;
    } catch (err) {    
      return rejectWithValue(err.response.data);
    }
  }
);




// SLice
// auth state
const initialState = {     
    tour:{},
    tours:[],
    error:"",
    userTours:[],
    loading:true,
}
const TourSlice = createSlice({
    name: "tour",
    initialState, 
    extraReducers: {
        [createTour.pending]:(state,action) => {
            state.loading = true         
        },
        [createTour.fulfilled]:(state,action) => {
           state.loading = false
           state.tours = [action.payload]
           state.error =""    
       },
       [createTour.rejected]:(state,action) => {
           state.loading = false 
           state.error =action.payload.meassage       
       },
       [getTour.pending]:(state,action) => {
        state.loading = true         
        },
        [getTour.fulfilled]:(state,action) => {
        state.loading = false
        state.tours = action.payload
        state.error =""   
        },
        [getTour.rejected]:(state,action) => {
            state.loading = false 
            state.error =action.payload.meassage       
        },
        [getSingelTour.pending]:(state,action) => {
          state.loading = true         
          },
        [getSingelTour.fulfilled]:(state,action) => {
        state.loading = false
        state.tour = action.payload
        state.error =""   
        },
        [getSingelTour.rejected]:(state,action) => {
            state.loading = false 
            state.error =action.payload.meassage       
        },
        [getTourByUser.pending]:(state,action) => {
          state.loading = true         
          },
        [getTourByUser.fulfilled]:(state,action) => {
        state.loading = false
        state.userTours = action.payload
        state.error =""   
        },
        [getTourByUser.rejected]:(state,action) => {
            state.loading = false 
            state.error =action.payload.meassage       
        },
        [DeleteATour.pending]:(state,action) => {
          state.loading = true         
          },
        [DeleteATour.fulfilled]:(state,action) => {
        state.loading = false
        state.userTours = action.payload
        state.error =""   
        },
        [DeleteATour.rejected]:(state,action) => {
            state.loading = false 
            state.error =action.payload.meassage       
        },
    }
});



export default TourSlice.reducer;