
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Activite {
    // define your record type here
}


interface State {
    record: Activite[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};



export const AddActivite = createAsyncThunk(
    "Activite/AddActivite",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.post("http://localhost:9996/BackendCRM/activite/addActivite",data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const AllActivites = createAsyncThunk(
    "Activite/AllActivites",
    async ( data , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9996/BackendCRM/activite/AllActivites");
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const DetailsActivite = createAsyncThunk(
    "Activite/ActiviteDetail",
    async ( data : any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9996/BackendCRM/activite/DetailsActivite?id="+data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const ActivitesForOpportunite = createAsyncThunk(
    "Activite/ActivitesForOpportunite",
    async ( data : any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9996/BackendCRM/activite/activitesForOpportunite/"+data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const SetActivitetermine = createAsyncThunk(
    "Activite/SetActiviteTermine",
    async (idActivite:any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await axios.put(
          `http://localhost:9996/BackendCRM/activite/setStatusActiviteTERMINE/${idActivite}`);
        console.log(response.data);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const SetActiviteencours = createAsyncThunk(
    "Activite/SetActiviteENCOURS",
    async (idActivite:any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await axios.put(
          `http://localhost:9996/BackendCRM/activite/setStatusActiviteENCOURS/${idActivite}`);
        console.log(response.data);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
 /************************ Add Activite ***********************/
export const AddActiviteExport = createSlice({
    name: "AddActivite",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddActivite.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AddActivite.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AddActivite.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
 /************************ AllActivites ***********************/
 export const AllActivitesExport = createSlice({
    name: "AllActivites",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AllActivites.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AllActivites.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AllActivites.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

 /************************ DetailsActivite ***********************/
 export const DetailsActiviteExport = createSlice({
    name: "DetailsActiviteExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(DetailsActivite.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(DetailsActivite.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(DetailsActivite.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

/************************ ActivitesForOpportunite ***********************/
export const ActivitesForOpportuniteExport = createSlice({
    name: "ActivitesForOpportuniteExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ActivitesForOpportunite.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(ActivitesForOpportunite.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(ActivitesForOpportunite.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ SetActivitetermine ***********************/
export const SetActivitetermineExport = createSlice({
    name: "SetActivitetermineExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SetActivitetermine.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(SetActivitetermine.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(SetActivitetermine.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ SetActiviteencours ***********************/
export const SetActiviteencoursExport = createSlice({
    name: "SetActiviteencoursExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SetActiviteencours.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(SetActiviteencours.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(SetActiviteencours.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

//added
export const ActivitesForTicket = createAsyncThunk(
    "Activite/ActivitesForTicket",
    async ( data : any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9996/BackendCRM/activite/activitesForTicket/"+data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)