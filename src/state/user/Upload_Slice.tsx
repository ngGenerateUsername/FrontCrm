
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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

export const UploadFile = createAsyncThunk(
    "upload/UploadFile",
    async ( form : FormData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:4000/uploadfile',
                data: form,
                headers: { 'Content-Type': 'multipart/form-data' },
              });

            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const Upload_Slice = createSlice({
    name: "upload",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            /************************ Upload file ***********************/
            .addCase(UploadFile.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(UploadFile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(UploadFile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default Upload_Slice
