
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Contrat {
    // define your record type here
}


interface State {
    record: Contrat[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};



export const AddContrat = createAsyncThunk(
    "Contrat/AddContrat",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.post("http://localhost:9992/BackendCRM/ticket/addContrat",data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const AllContrats = createAsyncThunk(
    "Contrat/AllContrats",
    async ( data , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9992/BackendCRM/ticket/AllContrats");
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const DetailsContrat = createAsyncThunk(
    "Contrat/DetailsContrat",
    async ( data : any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9992/BackendCRM/ticket/DetailsContrat?id="+data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


/************************ Add Contrat ***********************/
export const AddContratExport = createSlice({
    name: "AddContrat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddContrat.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AddContrat.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AddContrat.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ AllContrats ***********************/
 export const AllContratsExport = createSlice({
    name: "AllContrats",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AllContrats.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AllContrats.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AllContrats.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

/************************ DetailsContrat ***********************/
export const DetailsContratExport = createSlice({
    name: "DetailsContratExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(DetailsContrat.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(DetailsContrat.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(DetailsContrat.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

