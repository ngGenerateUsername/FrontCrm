import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";
import thunk from "redux-thunk";

interface Facture {
    // define your record type here
}


interface State {
    record: Facture[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};

export const AllFactureByCom = createAsyncThunk(
    "facture/AllFactureByCommercial",
    async ( data:any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get(`http://localhost:9000/BackendCRM/facture/commerciale/${data}`);

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const AddFacture = createAsyncThunk(
    "facture/AddFacture",
    async ( data:any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.post("http://localhost:9000/BackendCRM/facture",data);

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const FactureDetailsThunk = createAsyncThunk(
    "facture/FactureDetailsThunk",
    async ( data:any , thunkAPI) => {

        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get(`http://localhost:9000/BackendCRM/facture/${data}`);

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const DeleteFacture = createAsyncThunk(
    "facture/DeleteFacture",
    async ( data:any , thunkAPI) => {

        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.delete(`http://localhost:9000/BackendCRM/facture/delete/${data}`);
            
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)



//*************************************Slices******************************* */

export const AllFactureByComExport = createSlice({
    name: "AllFactureByCommercial",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AllFactureByCom.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AllFactureByCom.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AllFactureByCom.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})


export const AddFactureExport = createSlice({
    name: "AddFacture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddFacture.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AddFacture.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AddFacture.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const FactureDetailsExport = createSlice({
    name: "FactureDetailsThunk",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(FactureDetailsThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(FactureDetailsThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(FactureDetailsThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const DeleteFactureExport = createSlice({
    name: "DeleteFacture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(DeleteFacture.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(DeleteFacture.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(DeleteFacture.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})