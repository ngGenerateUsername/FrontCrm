
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Role {
    // define your record type here
}

interface State {
    record: Role[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};



export const PropEntreprise = createAsyncThunk(
    "Role/PropEntreprise",
    async (data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {         
            const result = await axios.get("http://localhost:8080/api/role_entreprise/Prop?id="+data);
            console.log(result.data);
            return result.data;

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const entreprisePerContact = createAsyncThunk(
    "Role/entreprisePerContact",
    async (data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {         
            const result = await axios.get('http://localhost:8080/api/role_entreprise/entreprisePerContact?id='+data);
            console.log(result.data);
            return result.data;

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const contactsPerEntreprise = createAsyncThunk(
    "Role/contactsPerEntreprise",
    async (data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {         
            const result = await axios.get("http://localhost:8080/api/role_entreprise/contactsPerEntreprise?id="+data);
            console.log(result.data);
            return result.data;

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const entreprisePerProp = createAsyncThunk(
    "Role/entreprisePerContact",
    async (data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {         
            const result = await axios.get("http://localhost:8080/api/role_entreprise/entreprisePerProp?id="+data);
            console.log(result.data);
            return result.data;

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const Prop = createAsyncThunk(
    "Role/Prop",
    async (data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {         
            const result = await axios.get('http://localhost:8080/api/role_entreprise/Prop?id='+data);
            console.log(result.data);
            return result.data;

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const CommerciauxPerEntreprise = createAsyncThunk(
    "Role/CommerciauxPerEntreprise",
    async (data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {         
            const result = await axios.get('http://localhost:8080/api/role_entreprise/commerciauxPerEntreprise?id=  '+data);
            console.log(result.data);
            return result.data;

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const RespTicketPerEntreprise = createAsyncThunk(
    "Role/CommerciauxPerEntreprise",
    async (data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {         
            const result = await axios.get('http://localhost:8080/api/role_entreprise/RespTicketPerEntreprise?id=  '+data);
            console.log(result.data);
            return result.data;

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

/************************ Prop Entreprise **************************/
export const PropEntrepriseExport = createSlice({
    name: "PropEntrepriseExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(PropEntreprise.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(PropEntreprise.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(PropEntreprise.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ entreprise Per Contact **************************/
export const entreprisePerContactExport = createSlice({
    name: "entreprisePerContact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(entreprisePerContact.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(entreprisePerContact.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(entreprisePerContact.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ entreprise Per Prop **************************/
export const entreprisePerPropExport = createSlice({
    name: "entreprisePerPropExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(entreprisePerProp.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(entreprisePerProp.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(entreprisePerProp.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ contacts Per Entreprise **************************/
export const contactsPerEntrepriseExport = createSlice({
    name: "contactsPerEntrepriseExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(contactsPerEntreprise.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(contactsPerEntreprise.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(contactsPerEntreprise.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ Prop **************************/
export const PropExport = createSlice({
    name: "PropExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Prop.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(Prop.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(Prop.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ Prop **************************/
export const CommerciauxPerEntrepriseExport = createSlice({
    name: "CommerciauxPerEntrepriseExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CommerciauxPerEntreprise.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(CommerciauxPerEntreprise.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(CommerciauxPerEntreprise.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ RespTicketPerEntreprise **************************/
export const RespTicketPerEntrepriseExport = createSlice({
    name: "RespTicketPerEntrepriseExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(RespTicketPerEntreprise.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(RespTicketPerEntreprise.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(RespTicketPerEntreprise.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})