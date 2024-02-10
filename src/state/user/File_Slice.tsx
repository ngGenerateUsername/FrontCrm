
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface File {
    // define your record type here
}


interface State {
    record: File[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};



export const AddFile = createAsyncThunk(
    "File/AddFile",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.post("http://localhost:9992/BackendCRM/ticket/addFileContrat",data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const AllFiles = createAsyncThunk(
    "File/AllFiles",
    async ( data , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9992/BackendCRM/ticket/AllFileContrats");
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const DetailsFile = createAsyncThunk(
    "File/DetailsFile",
    async ( data : any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9992/BackendCRM/ticket/DetailsFileContrat?id="+data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const FilesForContrat = createAsyncThunk(
    "FILE/FilesForContrat",
    async ( data : any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9992/BackendCRM/ticket/filesForContrat/"+data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const deleteFile = createAsyncThunk(
    "File/DeleteFile",
    async (data: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await axios.delete("http://localhost:9992/BackendCRM/ticket/deleteFileContrat/"+data);
        console.log(response.data);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  

/************************ AddFile ***********************/
export const AddFileExport = createSlice({
    name: "AddFile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddFile.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AddFile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AddFile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ AllFiles ***********************/
 export const AllFilesExport = createSlice({
    name: "AllFiles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AllFiles.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AllFiles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AllFiles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

/************************ DetailsFile ***********************/
export const DetailsFileExport = createSlice({
    name: "DetailsFileExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(DetailsFile.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(DetailsFile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(DetailsFile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

/************************ FilesForContrat ***********************/
export const FilesForContratExport = createSlice({
    name: "FilesForContratExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(FilesForContrat.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(FilesForContrat.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(FilesForContrat.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ deleteFile ***********************/
export const deleteFileExport = createSlice({
    name: "deleteFileExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteFile.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(deleteFile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})