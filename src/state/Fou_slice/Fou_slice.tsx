import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Fournissur {
    // define your record type here
}
interface State {
    record: Fournissur[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};

export const AllFournissur = createAsyncThunk(
    "Product/Fournissur",
    async ( data, thunkAPI: { rejectWithValue: any; }) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:8080/api/Fournisseur/Fournisseurs");
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const ajoutFournisseur = createAsyncThunk(
    "Fournisseur/ajoutFournisseur",
    async (data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.post(`http://localhost:8080/api/Fournisseur/ajoutFournisseur`,data);
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchSingleUserFournisseur = createAsyncThunk(
    "Fournisseur/fetchSingleUserFournisseur",
    async (data:any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get('http://localhost:8080/api/Fournisseur/FournisseurDetails?id='+data);
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)





export const AllFournissurExport = createSlice({
    name:"AllFournissur",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(AllFournissur.pending,(state)=>{
                state.status ="loading";
                state.error = null
            })
            .addCase(AllFournissur.fulfilled,(state,action)=>{
                state.status = "succeeded";
                state.record = action.payload
            })
            .addCase(AllFournissur.rejected,(state,action)=>{
                state.status = "failed";
                state.error = action.error.message
            })
    }
})




export const ajoutFournisseurExport = createSlice({
    name:"ajoutFournisseur",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(ajoutFournisseur.pending,(state)=>{
                state.status ="loading";
                state.error = null
            })
            .addCase(ajoutFournisseur.fulfilled,(state,action)=>{
                state.status = "succeeded";
                state.record = action.payload
            })
            .addCase(ajoutFournisseur.rejected,(state,action)=>{
                state.status = "failed";
                state.error = action.error.message
            })
    }
})



export const fetchSingleUserFournisseurExport = createSlice({
    name:"fetchSingleUserFournisseur",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchSingleUserFournisseur.pending,(state)=>{
                state.status ="loading";
                state.error = null
            })
            .addCase(fetchSingleUserFournisseur.fulfilled,(state,action)=>{
                state.status = "succeeded";
                state.record = action.payload
            })
            .addCase(fetchSingleUserFournisseur.rejected,(state,action)=>{
                state.status = "failed";
                state.error = action.error.message
            })
    }
})
