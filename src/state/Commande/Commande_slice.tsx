import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Commande {
    // define your record type here
}
interface State {
    record: Commande[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};
export const  AddLDC  = createAsyncThunk(
    "Commande/AddLDC",
    async (data: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        // Use idProduit directly from the argument list
        const { idProduit , idcontact, ...otherData } = data;
        const response = await axios.post(`http://localhost:9999/api/Lignedecommande/AddLDC/${idProduit}/${idcontact}`, otherData);
        console.log(response.data);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const Panier = createAsyncThunk(
    "Commande/Panier",
    async (data: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        // Use idProduit directly from the argument list
        const { idProduit,idcontact, ...otherData } = data;
      //  const response = await axios.post(`http://localhost:9999/api/Lignedecommande/ALLldc/{{idconcat}}/${idcontact}`, otherData);
    //    console.log(response.data);
      //  return response.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

  
/************************ AddLdc ***********************/
export const   AddLDCExport  = createSlice({
    name: "AddLDC",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddLDC.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(AddLDC.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(AddLDC.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ Panier ***********************/
// export const   PanierExport  = createSlice({
//     name: "Panier",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(Panier.pending, (state) => {
//                 state.status = 'loading';
//                 state.error = null

//             })
//             .addCase(Panier.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.record = action.payload;
//             })
//             .addCase(Panier.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//     }
// })

