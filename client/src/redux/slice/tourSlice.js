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
    async (page,{ rejectWithValue }) => {
      try {
        const response = await api.ApiGeteTour(page);       
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

// UPDATE TOUR

export const UpdateTour = createAsyncThunk(
  "tour/updateTour",
  async ({id, updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.ApiUPDATETour(updatedTourData,id);
      toast.success("Updated Tour successfully", {
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

// DELETE TOUR

export const DeleteATour = createAsyncThunk(
  "tour/deleteATour",
  async ({id,toast},{ rejectWithValue }) => {
    try {
      const response = await api.ApiDeleteSingelTour(id); 
      toast.success("TOUR DELETED SUCCESSFULLY");           
      return response.data;
    } catch (err) {    
      return rejectWithValue(err.response.data);
    }
  }
);

// SEARCH TOUR

export const SearchTour = createAsyncThunk(
  "tour/searchTours",
  async (searchQuery,{ rejectWithValue }) => {
    try {
      const response = await api.ApiSearchByTour(searchQuery);                 
      return response.data;
    } catch (err) {    
      return rejectWithValue(err.response.data);
    }
  }
);


// TAG TOUR

export const TagTours = createAsyncThunk(
  "tour/tagTours",
  async (tag,{ rejectWithValue }) => {
    try {
      const response = await api.ApiGetTourByTAG(tag);                 
      return response.data;
    } catch (err) {    
      return rejectWithValue(err.response.data);
    }
  }
);
// TAG TOUR

export const RelatedTours = createAsyncThunk(
  "tour/relatedTours",
  async (tags,{ rejectWithValue }) => {
    try {
      const response = await api.ApiGetRelatedTourByTAG(tags);                 
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
    tagTours:[],
    relatedTours:[],
    currentPage:1,
    numberOfPages:null,
    loading:true,
}
const TourSlice = createSlice({
    name: "tour",
    initialState, 
    reducers:{
      setCurrentPage:(state,action)=>{
        state.currentPage = action.payload
      }
    },
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
        state.tours = action.payload.data
        state.currentPage = action.payload.currentPage
        state.numberOfPages = action.payload.numberOfPages
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
          console.log("pending",action);   
          },
        [DeleteATour.fulfilled]:(state,action) => {
        state.loading = false
        console.log("action",action);
        const {arg: { id },} = action.meta;
        if (id) {
          state.userTours = state.userTours.filter((item) => item._id !== id);
          state.tours = state.tours.filter((item) => item._id !== id);
        }
        state.error =""   
        },
        [DeleteATour.rejected]:(state,action) => {
            state.loading = false 
            state.error =action.payload.meassage       
        },
        [SearchTour.pending]:(state,action) => {
          state.loading = true         
        },
        [SearchTour.fulfilled]:(state,action) => {
        state.loading = false
        state.tours = action.payload
        state.error =""   
        },
        [SearchTour.rejected]:(state,action) => {
            state.loading = false 
            state.error =action.payload.meassage       
        },
        [TagTours.pending]:(state,action) => {
          state.loading = true         
        },
        [TagTours.fulfilled]:(state,action) => {
        state.loading = false
        state.tagTours = action.payload
        state.error =""   
        },
        [TagTours.rejected]:(state,action) => {
            state.loading = false 
            state.error =action.payload.meassage       
        },
        [RelatedTours.pending]:(state,action) => {
          state.loading = true         
        },
        [RelatedTours.fulfilled]:(state,action) => {
        state.loading = false
        state.relatedTours = action.payload
        state.error =""   
        },
        [RelatedTours.rejected]:(state,action) => {
            state.loading = false 
            state.error =action.payload.meassage       
        },
    }
});

export const {setCurrentPage} = TourSlice.actions;

export default TourSlice.reducer;