import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Opportunite {
  // define your record type here
}

interface State {
  record: Opportunite[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  record: [],
  status: "idle",
  error: null,
};

export const AddOpportunite = createAsyncThunk(
  "Opportunite/AddOpportunite",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        "http://localhost:9992/BackendCRM/ticket/addOpportunite",
        data
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const DetailsOpportunite = createAsyncThunk(
  "Opportunite/OpportuniteDetail",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        "http://localhost:9992/BackendCRM/ticket/DetailsOpportunite?id=" + data
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const AllOpportunites = createAsyncThunk(
  "Opportunite/AllOpportunites",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        "http://localhost:9992/BackendCRM/ticket/AllOpportunites"
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const ActifOpportunites = createAsyncThunk(
  "Opportunite/ActifOpportunites",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        "http://localhost:9992/BackendCRM/ticket/actifOpportunities"
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const InactifOpportunites = createAsyncThunk(
  "Opportunite/InactifOpportunites",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        "http://localhost:9992/BackendCRM/ticket/actifOpportunities"
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const DeleteOpportunite = createAsyncThunk(
  "Opportunite/DeleteOpportunite",
  async (idOpportunite:any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(
        `http://localhost:9992/BackendCRM/ticket/deleteOpportunite/${idOpportunite}` );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const AllPISTEOpportunites = createAsyncThunk(
  "Opportunite/AllPISTEOpportunites",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        "http://localhost:9992/BackendCRM/ticket/piste"
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const AllPOTENTIELOpportunites = createAsyncThunk(
  "Opportunite/AllPOTENTIELOpportunites",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        "http://localhost:9992/BackendCRM/ticket/potentiel"
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const AllCONFIRMEEOpportunites = createAsyncThunk(
  "Opportunite/AllCONFIRMEEOpportunites",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        "http://localhost:9992/BackendCRM/ticket/confirmee"
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const AllSIGNEEOpportunites = createAsyncThunk(
  "Opportunite/AllSIGNEEOpportunites",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        "http://localhost:9992/BackendCRM/ticket/signee"
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const AllPERDUEOpportunites = createAsyncThunk(
  "Opportunite/AllPERDUEOpportunites",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        "http://localhost:9992/BackendCRM/ticket/perdue"
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const SetOpportunitePerdue = createAsyncThunk(
  "Opportunite/SetOpportunitePerdue",
  async (idOpportunite:any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(
        `http://localhost:9992/BackendCRM/ticket/setStatusOpportunitePERDUE/${idOpportunite}` );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const SetOpportunitePiste = createAsyncThunk(
  "Opportunite/SetOpportunitePiste",
  async (idOpportunite:any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(
        `http://localhost:9992/BackendCRM/ticket/setStatusOpportunitePISTE/${idOpportunite}`
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const SetOpportuniteSignee = createAsyncThunk(
  "Opportunite/SetOpportuniteSignee",
  async (idOpportunite:any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(
        `http://localhost:9992/BackendCRM/ticket/setStatusOpportuniteSIGNEE/${idOpportunite}` );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const SetOpportuniteConfirmee = createAsyncThunk(
    "Opportunite/SetOpportuniteConfirmee",
    async (idOpportunite:any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await axios.put(
          `http://localhost:9992/BackendCRM/ticket/setStatusOpportuniteCONFIRMEE/${idOpportunite}`
        );
        console.log(response.data);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
export const SetOpportunitePotentiel = createAsyncThunk(
  "Opportunite/SetOpportunitePotentiel",
  async (idOpportunite:any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(
        `http://localhost:9992/BackendCRM/ticket/setStatusOpportunitePOTENTIEL/${idOpportunite}`);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePriorite = createAsyncThunk(
  "Opportunite/updatePriorite",
  async ({ idOpportunite, priorite }: { idOpportunite: any; priorite: any }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(
        `http://localhost:9992/BackendCRM/ticket/updatePriorite/${idOpportunite}`,
        { priorite: priorite }
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/************************ Add Opportunite ***********************/
export const AddOpportuniteExport = createSlice({
  name: "AddOpportunite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddOpportunite.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(AddOpportunite.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(AddOpportunite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ AllOpportunites ***********************/
export const AllOpportunitesExport = createSlice({
  name: "AllOpportunites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AllOpportunites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(AllOpportunites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(AllOpportunites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ ActifOpportunites ***********************/
export const ActifOpportunitesExport = createSlice({
  name: "ActifOpportunites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ActifOpportunites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(ActifOpportunites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(ActifOpportunites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ InactifOpportunites ***********************/
export const InactifOpportunitesExport = createSlice({
  name: "InactifOpportunites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(InactifOpportunites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(InactifOpportunites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(InactifOpportunites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ DeleteOpportunites ***********************/
export const DeleteOpportuniteExport = createSlice({
  name: "DeleteOpportunite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DeleteOpportunite.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(DeleteOpportunite.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(DeleteOpportunite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ AllPISTEOpportunites ***********************/
export const AllPISTEOpportunitesExport = createSlice({
  name: "AllPISTEOpportunites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AllPISTEOpportunites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(AllPISTEOpportunites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(AllPISTEOpportunites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ AllPOTENTIELOpportunites ***********************/
export const AllPOTENTIELOpportunitesExport = createSlice({
  name: "AllPOTENTIELOpportunites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AllPOTENTIELOpportunites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(AllPOTENTIELOpportunites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(AllPOTENTIELOpportunites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ AllCONFIRMEEOpportunites ***********************/
export const AllCONFIRMEEOpportunitesExport = createSlice({
  name: "AllCONFIRMEEOpportunites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AllCONFIRMEEOpportunites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(AllCONFIRMEEOpportunites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(AllCONFIRMEEOpportunites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ AllSIGNEEOpportunites ***********************/
export const AllSIGNEEOpportunitesExport = createSlice({
  name: "AllSIGNEEOpportunites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AllSIGNEEOpportunites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(AllSIGNEEOpportunites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(AllSIGNEEOpportunites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ AllPERDUEOpportunites ***********************/
export const AllPERDUEOpportunitesExport = createSlice({
  name: "AllPERDUEOpportunites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AllPERDUEOpportunites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(AllPERDUEOpportunites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(AllPERDUEOpportunites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ DetailsOpportunite ***********************/
export const DetailsOpportuniteExport = createSlice({
  name: "DetailsOpportuniteExport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DetailsOpportunite.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(DetailsOpportunite.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(DetailsOpportunite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

/************************ SetOpportunitePerdue ***********************/
export const SetOpportunitePerdueExport = createSlice({
  name: "OpportunitePerdue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SetOpportunitePerdue.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(SetOpportunitePerdue.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(SetOpportunitePerdue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ SetOpportunitePiste ***********************/
export const SetOpportunitePisteExport = createSlice({
  name: "OpportunitePiste",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SetOpportunitePiste.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(SetOpportunitePiste.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(SetOpportunitePiste.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ SetOpportuniteSignee ***********************/
export const SetOpportuniteSigneeExport = createSlice({
  name: "OpportuniteSignee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SetOpportuniteSignee.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(SetOpportuniteSignee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(SetOpportuniteSignee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ SetOpportuniteConfirmee ***********************/
export const SetOpportuniteConfirmeeExport = createSlice({
  name: "OpportuniteConfirmee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SetOpportuniteConfirmee.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(SetOpportuniteConfirmee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(SetOpportuniteConfirmee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ SetOpportunitePotentiel ***********************/
export const SetOpportunitePotentielExport = createSlice({
  name: "OpportunitePotentiel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SetOpportunitePotentiel.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(SetOpportunitePotentiel.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(SetOpportunitePotentiel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

/************************ updatePriorite ***********************/
export const updatePrioriteExport = createSlice({
  name: "updatePriorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePriorite.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updatePriorite.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(updatePriorite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});