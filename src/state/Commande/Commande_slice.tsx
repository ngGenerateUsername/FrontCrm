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
        const { idcontact, ...otherData } = data;
       const response = await axios.get(`http://localhost:9999/api/Lignedecommande/ALLldc/${idcontact}`, otherData);
        console.log(response.data);
       return response.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
export const Deletefromcmd = createAsyncThunk( 
  "Commande/Deletefromcmd",
  async (data: any, thunkAPI) => { 
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.delete("http://localhost:9999/api/Lignedecommande/Deleteitempanier/"+data);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
interface UpdateCmdQuantityData {
  idldc: number; // Adjust the type as needed
  qte: number; // Adjust the type as needed
}

export const updateCmdQuantity = createAsyncThunk(
  'commande/updateCmdQuantity',
  async (data: UpdateCmdQuantityData, thunkAPI) => { 
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(`http://localhost:9999/api/Lignedecommande/updatecmd`, data );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const addcommande = createAsyncThunk(
  'commande/addcommande',
  async (data: any, thunkAPI) => { 
    const { rejectWithValue } = thunkAPI;
    try {
      const {  idClient,idetse, ...otherData } = data;

      const response = await axios.post(`http://localhost:9999/commande/addcommand/${idClient}/${idetse}`,otherData);
      console.log(response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const mycmd = createAsyncThunk(
  "Commande/mycmd",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { idcontact, ...otherData } = data;
     const response = await axios.get(`http://localhost:9999/commande/mycommande/${idcontact}`, otherData);
      console.log(response.data);
     return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getcommanddetails = createAsyncThunk(
  "Commande/getcommanddetails",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { idCmd } = data;
      const response = await axios.get(`http://localhost:9999/commande/getcommanddetails/${idCmd}`);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const myetsecmd = createAsyncThunk(
  "Commande/myetsecmd",
  async (data: any, thunkAPI) => {
    const { rejectWithValue }= thunkAPI;
    try {
      const { identreprise, ...otherData } = data;
     const response = await axios.get(`http://localhost:9999/commande/getalletsecommande/${identreprise}`, otherData);
      console.log(response.data);
     return response.data
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

 
  /************************ add ***********************/
  export const   AddcommandeExport  = createSlice({
    name: "addcommande",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addcommande.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(addcommande.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(addcommande.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

  /************************ update ***********************/

  export const   updateCmdQuantityExport  = createSlice({
    name: "updateCmdQuantity",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateCmdQuantity.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(updateCmdQuantity.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(updateCmdQuantity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ delete ***********************/

  export const   DeletefromcmdExport  = createSlice({
    name: "Deletefromcmd",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Deletefromcmd.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(Deletefromcmd.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(Deletefromcmd.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
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
export const   PanierExport  = createSlice({
    name: "Panier",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Panier.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(Panier.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(Panier.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ MyCmd ***********************/

export const   getcommanddetailsExport  = createSlice({
  name: "getcommanddetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(getcommanddetails.pending, (state) => {
              state.status = 'loading';
              state.error = null

          })
          .addCase(getcommanddetails.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.record = action.payload;
          })
          .addCase(getcommanddetails.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.error.message;
          })
  }
})
/************************ MyCmddetails ***********************/

export const   MycmdExport  = createSlice({
  name: "mycmd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(mycmd.pending, (state) => {
              state.status = 'loading';
              state.error = null

          })
          .addCase(mycmd.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.record = action.payload;
          })
          .addCase(mycmd.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.error.message;
          })
  }
})
/************************ myetsecmd ***********************/

export const   myetsecmdExport  = createSlice({
  name: "myetsecmd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(myetsecmd.pending, (state) => {
              state.status = 'loading';
              state.error = null

          })
          .addCase(myetsecmd.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.record = action.payload;
          })
          .addCase(myetsecmd.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.error.message;
          })
  }
})