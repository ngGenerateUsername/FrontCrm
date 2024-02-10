
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Client {
    // define your record type here
}

interface State {
    record: Client[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};


export const fetchClients = createAsyncThunk(
    "Client/fetchClients",
    async (data , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get(`http://localhost:8080/api/client/clients`);
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const fetchSingleClient = createAsyncThunk(
    "Client/fetchSingleClient",
    async (data:any , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get('http://localhost:8080/api/client/clientDetails?id='+data);
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const AddClient = createAsyncThunk(
    "Client/AddClient",
    async (data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.post(`http://localhost:8080/api/client/ajoutClient`,data);
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const UpdateClient = createAsyncThunk(
    "Client/UpdateClient",
    async (data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        console.log(data)
        try {
            const response = await axios.put(`http://localhost:8080/api/client/ModifierClient`,data);
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)



/************************ Get All clients **************************/
export const fetchClientsExport = createSlice({
    name: "fetchClientsExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ Add Client **************************/
export const AddClientExport = createSlice({
    name: "AddClientExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddClient.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AddClient.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AddClient.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ Update Client **************************/
export const UpdateClientExport = createSlice({
    name: "UpdateClientExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(UpdateClient.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(UpdateClient.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(UpdateClient.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ details Client **************************/
export const fetchSingleClientExport = createSlice({
    name: "fetchSingleClientExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleClient.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(fetchSingleClient.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(fetchSingleClient.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
