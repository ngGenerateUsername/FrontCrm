import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";
import thunk from "redux-thunk";

interface Offre {
    // define your record type here
}


interface State {
    record: Offre[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};

export const AllOffre = createAsyncThunk(
    "Offre/AllOffre",
    async ( data , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9998/BackendCRM/offre/all");
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const AddOffre = createAsyncThunk(
    "Offre/AddOffre",
    async ( data:any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.post("http://localhost:9998/BackendCRM/offre",data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const OffreDetailsThunk = createAsyncThunk(
    "Offre/OffreDetailsThunk",
    async ( data:any , thunkAPI) => {

        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get(`http://localhost:9998/BackendCRM/offre/id/${data}`);
            console.log("this is the offre",response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const DeleteOffre = createAsyncThunk(
    "Offre/DeleteOffre",
    async ( data:any , thunkAPI) => {

        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.delete(`http://localhost:9998/BackendCRM/offre/id/${data}`);
            
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const UpdateOffre = createAsyncThunk(
    "Offre/UpdateOffre",
    async ( data:any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.post("http://localhost:9998/BackendCRM/offre",data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)



//*************************************Slices******************************* */

export const AllOffreExport = createSlice({
    name: "AllOffre",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AllOffre.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AllOffre.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AllOffre.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})


export const AddOffreExport = createSlice({
    name: "AddOffre",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddOffre.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AddOffre.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AddOffre.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const DeleteOffreExport = createSlice({
    name: "DeleteOffre",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(DeleteOffre.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(DeleteOffre.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(DeleteOffre.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})


export const OffreDetailsExport = createSlice({
    name: "OffreDetailsThunk",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(OffreDetailsThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(OffreDetailsThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(OffreDetailsThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const UpdateOffreExport = createSlice({
    name: "UpdateOffre",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(UpdateOffre.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(UpdateOffre.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(UpdateOffre.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})