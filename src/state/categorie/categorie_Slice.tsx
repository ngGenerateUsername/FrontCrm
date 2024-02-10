import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Categorie {
    // define your record type here
}


interface State {
    record: Categorie[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};

export const AllCategorie = createAsyncThunk(
    "Categorie/AllCategorie",
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

export const DeleteCategorie = createAsyncThunk(
    "Categorie/DeleteCategorie",
    async ( data : any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.delete("http://localhost:9998/BackendCRM/categorie/"+data);
            console.log("API response:", response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const ModifierCategorie = createAsyncThunk(
    "Categorie/ModifierCategorie",
    async (data: any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.put('http://localhost:9998/BackendCRM/categorie' ,data);
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const AddCategorie = createAsyncThunk(
    "Categorie/AddCategorie",
    async (data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.post(`http://localhost:9998/BackendCRM/categorie`,data);
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const FindCategorieById = createAsyncThunk(
    "Categorie/FindCategorieById",
    async (data:any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get("http://localhost:9998/BackendCRM/categorie/"+data);
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


/************************ AllCategorie ***********************/
export const AllCategorieExport = createSlice({
    name: "AllCategorie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AllCategorie.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AllCategorie.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AllCategorie.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

/************************ DeleteCategorie ***********************/
export const DeleteCategorieExport = createSlice({
    name: "DeleteCategorie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(DeleteCategorie.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(DeleteCategorie.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(DeleteCategorie.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

/************************ modifier Categorie **************************/
export const ModifierCategorieExport = createSlice({
    name: "ModifierCategorieExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ModifierCategorie.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(ModifierCategorie.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(ModifierCategorie.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ Add Categorie **************************/
export const AddCategorieExport = createSlice({
    name: "AddCategorieExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddCategorie.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AddCategorie.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AddCategorie.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
        }
    })
/************************ FindCategorieById **************************/
export const FindCategorieByIdExport = createSlice({
    name: "FindCategorieByIdExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(FindCategorieById.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(FindCategorieById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(FindCategorieById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
        }
    })