
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Entreprise {
    // define your record type here
}

interface State {
    record: Entreprise[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};


export const fetchEntreprises = createAsyncThunk(
    "Entreprises/fetchEntreprises",
    async (data , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get(`http://localhost:8080/api/entreprise/entreprises`);
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const fetchSingleUserEntreprise = createAsyncThunk(
    "Entreprises/fetchSingleUserEntreprise",
    async (data:any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get('http://localhost:8080/api/entreprise/EntrepriseDetails?id='+data);
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const AddEntreprise = createAsyncThunk(
    "Entreprises/AddEntreprise",
    async (data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.post(`http://localhost:8080/api/auth/ajoutEntreprise`,data);
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const UpdateEntreprise = createAsyncThunk(
    "Entreprises/EditEntreprise",
    async (data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.put(`http://localhost:8080/api/auth/ModifierEntreprise`,data);
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

/************************ Get All entreprises **************************/
export const All_Entreprises = createSlice({
    name: "AllEntreprises",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEntreprises.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(fetchEntreprises.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(fetchEntreprises.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ Add Entreprise **************************/
export const Add_Entreprise = createSlice({
    name: "AddEntreprise",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddEntreprise.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AddEntreprise.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AddEntreprise.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ Edit Entreprise **************************/
export const UpdateEntrepriseExport = createSlice({
    name: "UpdateEntrepriseExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(UpdateEntreprise.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(UpdateEntreprise.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(UpdateEntreprise.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ fetch Single User Entreprise **************************/
export const fetchSingleUserEntrepriseExport = createSlice({
    name: "fetchSingleUserEntrepriseExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleUserEntreprise.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(fetchSingleUserEntreprise.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(fetchSingleUserEntreprise.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
