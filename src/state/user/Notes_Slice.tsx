
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Notes {
    // define your record type here
}


interface State {
    record: Notes[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};



export const AddNotes = createAsyncThunk(
    "Notes/AddNotes",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.post("http://localhost:9996/BackendCRM/Notes/addNote",data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const AllNotes = createAsyncThunk(
    "Notes/AllNotes",
    async ( data , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9996/BackendCRM/Notes/AllNotess");
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const DetailsNote = createAsyncThunk(
    "Notes/DetailsNote",
    async ( data : any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9996/BackendCRM/Notes/DetailsNote?id="+data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const NotesForActivite = createAsyncThunk(
    "Notes/NotessForContrat",
    async ( data : any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9996/BackendCRM/Notes/NotesForActivite/"+data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const NotesForOpportunite = createAsyncThunk(
    "Notes/NotessForOpportunite",
    async ( data : any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9996/BackendCRM/Notes/NotesForOpportunite/"+data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteNote = createAsyncThunk(
    "Notes/DeleteNote",
    async (data: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await axios.delete("http://localhost:9996/BackendCRM/Notes/deleteNote/"+data);
        console.log(response.data);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  

/************************ AddNotes ***********************/
export const AddNotesExport = createSlice({
    name: "AddNotes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddNotes.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AddNotes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AddNotes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ AllNotes ***********************/
 export const AllNotesExport = createSlice({
    name: "AllNotes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AllNotes.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AllNotes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AllNotes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ NotesForActivite ***********************/
export const NotesForActiviteExport = createSlice({
    name: "NotesForActiviteExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(NotesForActivite.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(NotesForActivite.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(NotesForActivite.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ NotesForOpportunite ***********************/
export const NotesForOpportuniteExport = createSlice({
    name: "NotesForOpportuniteExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(NotesForOpportunite.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(NotesForOpportunite.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(NotesForOpportunite.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ DetailsNote ***********************/
export const DetailsNoteExport = createSlice({
    name: "DetailsNoteExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(DetailsNote.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(DetailsNote.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(DetailsNote.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

/************************ deleteNote ***********************/
export const deleteNoteExport = createSlice({
    name: "deleteNoteExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteNote.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})