
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Import from "components/menu/Import";

interface File {
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

export const ImportCSVClients = createAsyncThunk(
    "Import/Import",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:4001/api/CsvToJson',
                data: data.form,
                headers: { 'Content-Type': 'multipart/form-data' },
              });

            console.log(response.data)
            const result = await axios.post('http://localhost:8080/api/client/addClientsFromList?id='+data.id,response.data);

            return result.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const ImportExelClients = createAsyncThunk(
    "Import/ImportExel",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:4001/api/ExelToJson',
                data:  data.form,
                headers: { 'Content-Type': 'multipart/form-data' },
              });

            console.log(response.data)
            const result = await axios.post('http://localhost:8080/api/client/addClientsFromList?id='+data.id,response.data);

            return result.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const ImportCSVContacts = createAsyncThunk(
    "Import/Import",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:4001/api/CsvToJson',
                data: data.form,
                headers: { 'Content-Type': 'multipart/form-data' },
              });

            console.log(response.data)
            const result = await axios.post('http://localhost:8080/api/client/addContactsFromList',response.data);

            return result.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const ImportExelContacts = createAsyncThunk(
    "Import/ImportExel",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:4001/api/ExelToJson',
                data:  data.form,
                headers: { 'Content-Type': 'multipart/form-data' },
              });

            console.log(response.data)
            const result = await axios.post('http://localhost:8080/api/client/addContactsFromList',response.data);

            return result.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const ImportCSVContactsExport = createSlice({
    name: "ImportCSV",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            /************************ Upload file ***********************/
            .addCase(ImportCSVContacts.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(ImportCSVContacts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(ImportCSVContacts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
export const ImportExelContactsExport = createSlice({
    name: "ImportExel",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            /************************ Upload file ***********************/
            .addCase(ImportExelContacts.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(ImportExelContacts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(ImportExelContacts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const ImportCSVClientsExport = createSlice({
    name: "ImportCSV",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            /************************ Upload file ***********************/
            .addCase(ImportCSVClients.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(ImportCSVClients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(ImportCSVClients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
export const ImportExelClientsExport = createSlice({
    name: "ImportExel",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            /************************ Upload file ***********************/
            .addCase(ImportExelClients.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(ImportExelClients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(ImportExelClients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

