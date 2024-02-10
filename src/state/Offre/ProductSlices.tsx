import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";
import thunk from "redux-thunk";

interface Product {
    // define your record type here
}
interface State {
    record: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};

export const AllProduct = createAsyncThunk(
    "Product/AllProduct",
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
export const AllCategories = createAsyncThunk(
    "Category/AllCategories",
    async ( data , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9998/BackendCRM/categorie");
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const ProductsByCategory = createAsyncThunk(
    "Product/ProductsByCategory",
    async ( data , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get(`http://localhost:9998/BackendCRM/produit/categorie/${data}`);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)



//*************************************Slices******************************* */

export const AllProductExport = createSlice({
    name:"AllProduct",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(AllProduct.pending,(state)=>{
                state.status ="loading";
                state.error = null
            })
            .addCase(AllProduct.fulfilled,(state,action)=>{
                state.status = "succeeded";
                state.record = action.payload
            })
            .addCase(AllProduct.rejected,(state,action)=>{
                state.status = "failed";
                state.error = action.error.message
            })
    }
})

export const ProductsByCategoryExport = createSlice({
    name:"ProductsByCategory",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(ProductsByCategory.pending,(state)=>{
                state.status ="loading";
                state.error = null
            })
            .addCase(ProductsByCategory.fulfilled,(state,action)=>{
                state.status = "succeeded";
                state.record = action.payload
            })
            .addCase(ProductsByCategory.rejected,(state,action)=>{
                state.status = "failed";
                state.error = action.error.message
            })
    }
})

export const AllCategoriesExport = createSlice({
    name:"AllCategories",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(AllCategories.pending,(state)=>{
                state.status ="loading";
                state.error = null
            })
            .addCase(AllCategories.fulfilled,(state,action)=>{
                state.status = "succeeded";
                state.record = action.payload
            })
            .addCase(AllCategories.rejected,(state,action)=>{
                state.status = "failed";
                state.error = action.error.message
            })
    }
})