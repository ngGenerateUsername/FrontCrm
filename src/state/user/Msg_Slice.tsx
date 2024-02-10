
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Msg {
    // define your record type here
}


interface State {
    record: Msg[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};



export const AddMsg = createAsyncThunk(
    "AddMsg",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.post("http://localhost:9992/BackendCRM/ticket/addMsg",data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const AllMsgs = createAsyncThunk(
    "AllMsgs",
    async ( data , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9992/BackendCRM/ticket/AllMsgs");
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const DetailsMsg = createAsyncThunk(
    "DetailsMsg",
    async ( data : any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9992/BackendCRM/ticket/DetailsMsg?id="+data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const SetStatusMsg = createAsyncThunk(
    "SetStatusMsg",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.put("http://localhost:9992/BackendCRM/ticket/setStatusMsg",data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)




/************************ AddMsg ***********************/
export const AddMsgExport = createSlice({
    name: "AddMsg",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddMsg.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AddMsg.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AddMsg.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ AllMsgs ***********************/
 export const AllMsgsExport = createSlice({
    name: "AllMsgs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AllMsgs.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AllMsgs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AllMsgs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ DetailsMsg ***********************/
 export const DetailsMsgExport = createSlice({
    name: "DetailsMsg",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(DetailsMsg.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(DetailsMsg.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(DetailsMsg.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ SetStatusMsg ***********************/
export const SetStatusMsgExport = createSlice({
    name: "SetStatusMsg",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SetStatusMsg.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(SetStatusMsg.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(SetStatusMsg.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})