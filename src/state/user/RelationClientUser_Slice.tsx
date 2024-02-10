import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface RelationClientUser {
  // define your record type here
}
interface State {
  record: RelationClientUser[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  record: [],
  status: "idle",
  error: null,
};

export const AddRelationClientUser = createAsyncThunk(
  "AddRelationClientUser",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        `http://localhost:8080/api/RelationClientUser/ajout`,
        data
      );
      //console.log(response.data,'response.data')
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const MyCLientsUser = createAsyncThunk(
  "MyCLientsUser",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/RelationClientUser/MyCLientsUser?id=` + data
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const CLientsOfMyEntreprise = createAsyncThunk(
  "CLientsOfMyEntreprise",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/RelationClientUser/CLientsOfMyEntreprise?id=` +
          data
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const UpdateRelationClientUser = createAsyncThunk(
  "UpdateRelationClientUser",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(
        `http://localhost:8080/api/RelationClientUser/update`,
        data
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const MyContacts = createAsyncThunk(
  "MyContacts",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/RelationClientUser/MyContacts?id=` + data
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const DeleteRelationClientUser = createAsyncThunk(
  "DeleteRelationClientUser",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log(data)
    try {
      const response = await axios.delete(
        "http://localhost:8080/api/RelationClientUser/supprimerRelationClientUserPerIdUserAndIdClient?idClient="+data.idClient+"&idUser="+data.idUser
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const ListClientsPerContact = createAsyncThunk(
  "ListClientsPerContact",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/RelationClientUser/ListClientsPerContact?id=`+data);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const ListEntreprisePerClient = createAsyncThunk(
  "ListEntreprisePerClient",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/RelationClientUser/ListEntreprisePerClient?id=`+data);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const CLientsOfMyEntrepriseJustClients = createAsyncThunk(
  "CLientsOfMyEntrepriseJustClients",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/RelationClientUser/CLientsOfMyEntrepriseJustClients?id=`+data);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
/************************ Clients Per user (Commercial) **************************/
export const MyCLientsUserExport = createSlice({
  name: "MyCLientsUserExport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(MyCLientsUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(MyCLientsUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(MyCLientsUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ CLients Of My Entreprise **************************/
export const CLientsOfMyEntrepriseExport = createSlice({
  name: "CLientsOfMyEntrepriseExport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CLientsOfMyEntreprise.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(CLientsOfMyEntreprise.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(CLientsOfMyEntreprise.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ AddRelationClientUser **************************/
export const AddRelationClientUserExport = createSlice({
  name: "AddRelationClientUserExport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddRelationClientUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(AddRelationClientUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(AddRelationClientUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ MyContacts **************************/
export const MyContactsExport = createSlice({
  name: "MyContactsExport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(MyContacts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(MyContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(MyContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ ListClientsPerContact **************************/
export const ListClientsPerContactExport = createSlice({
  name: "ListClientsPerContactExport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ListClientsPerContact.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(ListClientsPerContact.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(ListClientsPerContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ ListEntreprisePerClient **************************/
export const ListEntreprisePerClientExport = createSlice({
  name: "ListEntreprisePerClientExport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ListEntreprisePerClient.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(ListEntreprisePerClient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(ListEntreprisePerClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
/************************ CLientsOfMyEntrepriseJustClients **************************/
export const CLientsOfMyEntrepriseJustClientsExport = createSlice({
  name: "CLientsOfMyEntrepriseJustClientsExport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CLientsOfMyEntrepriseJustClients.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(CLientsOfMyEntrepriseJustClients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(CLientsOfMyEntrepriseJustClients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});