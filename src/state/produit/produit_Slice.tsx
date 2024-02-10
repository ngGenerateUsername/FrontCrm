import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Produit {
    // define your record type here
}


interface State {
    record: Produit[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};

export const AllProduit = createAsyncThunk(
    "Produit/AllProduit",
    async ( data , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9998/BackendCRM/produit");
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const DeleteProduit = createAsyncThunk(
    "Produit/DeleteProduit",
    async ( data : any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.delete("http://localhost:9998/BackendCRM/produit/"+data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const ModifierProduit = createAsyncThunk(
    "Produit/ModifierProduit",
    async (data:any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.put('http://localhost:9998/BackendCRM/produit' ,data);
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const AddProduit = createAsyncThunk(
    "Produit/Produit",
    async (data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const { idCategorie, ...otherData } = data;
            const response = await axios.post(`http://localhost:9998/BackendCRM/produit/${idCategorie}`,otherData);
            console.log(`URL: http://localhost:9998/BackendCRM/produit/${idCategorie}`);
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)




/************************ AllProduit ***********************/
export const AllProduitExport = createSlice({
    name: "AllProduit",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AllProduit.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AllProduit.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AllProduit.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

/************************ DeleteProduit ***********************/
export const DeleteProduitExport = createSlice({
    name: "DeleteProduit",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(DeleteProduit.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(DeleteProduit.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(DeleteProduit.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

/************************ modifier Produit **************************/
export const ModifierProduitExport = createSlice({
    name: "ModifierProduitExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ModifierProduit.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(ModifierProduit.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(ModifierProduit.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ Add Produit **************************/
export const AddProduitExport = createSlice({
    name: "AddProduitExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddProduit.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AddProduit.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AddProduit.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})