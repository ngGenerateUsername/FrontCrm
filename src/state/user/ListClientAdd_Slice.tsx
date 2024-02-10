
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

interface ListClient {
    // define your record type here
}


interface State {
    record: ListClient[];
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
        const dispatch = useDispatch();
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:4001/api/uploadCsv/create',
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

        //add file

        /* [fileHandler.pending]: (state) => {
            state.loading = true;
            state.error = null
        },
        [fileHandler.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [fileHandler.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }, */


        builder
          

            /************************ Get Single user ***********************/
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
