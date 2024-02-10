
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Ticket {
    // define your record type here
}


interface State {
    record: Ticket[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};



export const AddTicket = createAsyncThunk(
    "Ticket/AddTicket",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.post("http://localhost:9998/BackendCRM/ticket/addTicket",data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const AllTickets = createAsyncThunk(
    "Ticket/AllTickets",
    async ( data , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9998/BackendCRM/ticket/AllTickets");
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const AllticketsPerContact = createAsyncThunk(
    "Ticket/AllTickets",
    async ( data : any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9998/BackendCRM/ticket/AllticketsPerContact?id="+data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const AllticketsPerRespTicket = createAsyncThunk(
    "Ticket/AllticketsPerRespTicket",
    async ( data : any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9998/BackendCRM/ticket/AllticketsPerRespTicket?id="+data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const DetailsTicket = createAsyncThunk(
    "Ticket/DetailsTicket",
    async ( data : any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.get("http://localhost:9998/BackendCRM/ticket/DetailsTicket?id="+data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const SetStatusTicket = createAsyncThunk(
    "Ticket/SetStatusTicket",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.put("http://localhost:9998/BackendCRM/ticket/setStatusTicket",data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const SetNotesTicket = createAsyncThunk(
    "Ticket/SetNotesTicket",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.put("http://localhost:9998/BackendCRM/ticket/AddNotesTicket",data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const setPrioriteTicket = createAsyncThunk(
    "Ticket/setPrioriteTicket",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.put("http://localhost:9998/BackendCRM/ticket/setPrioriteTicket",data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const setTypeTicket = createAsyncThunk(
    "Ticket/setTypeTicket",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const response = await axios.put("http://localhost:9998/BackendCRM/ticket/setTypeTicket",data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

/************************ Add Ticket ***********************/
export const AddTicketExport = createSlice({
    name: "AddTicket",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddTicket.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AddTicket.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AddTicket.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ AllTickets ***********************/
 export const AllTicketsExport = createSlice({
    name: "AllTickets",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AllTickets.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AllTickets.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AllTickets.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ AllTickets ***********************/
 export const AllticketsPerContactExport = createSlice({
    name: "AllticketsPerContactExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AllticketsPerContact.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AllticketsPerContact.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AllticketsPerContact.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ AllTickets ***********************/
export const AllticketsPerRespTicketExport = createSlice({
    name: "AllticketsPerContactExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AllticketsPerRespTicket.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AllticketsPerRespTicket.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AllticketsPerRespTicket.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ DetailsTicket ***********************/
export const DetailsTicketExport = createSlice({
    name: "DetailsTicketExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(DetailsTicket.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(DetailsTicket.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(DetailsTicket.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ setStatusTicket ***********************/
export const SetStatusTicketExport = createSlice({
    name: "SetStatusTicketExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SetStatusTicket.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(SetStatusTicket.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(SetStatusTicket.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
