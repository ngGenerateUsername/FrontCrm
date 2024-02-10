
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    // define your record type here
}
interface Image {
    idUser : string;
    image : string;
}

interface State {
    record: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};


export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (data, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get(`http://localhost:8080/api/contact/users`);
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const fetchSingleUser = createAsyncThunk(
    "users/fetchSingleUser",
    async ( id : string, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get(`http://localhost:8080/api/contact/profileContact?id=`+id);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const fetchSingleUser2 = createAsyncThunk(
    "users/fetchSingleUser2",
    async ( id : string, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get(`http://localhost:8080/api/contact/profileContact?id=`+id);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const fetchSingleUser3 = createAsyncThunk(
    "users/fetchSingleUser3",
    async ( id : string, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get(`http://localhost:8080/api/contact/profileContact?id=`+id);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchSingleUser4 = createAsyncThunk(
    "users/fetchSingleUser4",
    async ( id : string, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get(`http://localhost:8080/api/contact/profileContact?id=`+id);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const ChangeImage = createAsyncThunk(
    "users/ChangeImage",
    async ( id : Image , thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.put(`http://localhost:8080/api/auth/ModifierImage`,id);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const CreateVerifCodeForgetPasswordPerMail = createAsyncThunk(
    "users/fetchSingleUser",
    async ( email : string, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.put("http://localhost:8080/api/contact/CreateVerifCodeForgetPassword?mail="+email);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const CreateVerifCodeForgetPasswordPerUsername = createAsyncThunk(
    "users/CreateVerifCodeForgetPasswordPerUsername",
    async ( username : string, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.put("http://localhost:8080/api/contact/CreateVerifCodeForgetPassword?username="+username);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const newPasswordFromForgetPassword = createAsyncThunk(
    "users/newPasswordFromForgetPassword",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.put( "http://localhost:8080/api/contact/ForgetPassword?code=" +
            data.code +
            "&password=" +
            data.password);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const SignIn = createAsyncThunk(
    "users/SignIn",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.post("http://localhost:8080/api/auth/signin",data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const SignUp = createAsyncThunk(
    "users/SignUp",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.post("http://localhost:8080/api/auth/signup",data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const CodeVerification = createAsyncThunk(
    "users/CodeVerification",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get("http://localhost:8080/api/contact/CodeVerification?id=" + data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const verify = createAsyncThunk(
    "users/CodeVerification",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get('http://localhost:8080/api/contact/verify?code='+data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const findByMail = createAsyncThunk(
    "users/findByMail",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get(`http://localhost:8080/api/contact/findByMail?id=`+data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const findByUsername = createAsyncThunk(
    "users/findByUsername",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get("http://localhost:8080/api/contact/findByUsername?id="+data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const UpdateUser = createAsyncThunk(
    "users/UpdateUser",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.put("http://localhost:8080/api/auth/updateProfile",data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const UpdatePasswordUser = createAsyncThunk(
    "users/UpdatePasswordUser",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.put("http://localhost:8080/api/auth/newPassword",data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const UpdateUserUsernameORMail = createAsyncThunk(
    "users/UpdateUserUsernameORMail",
    async ( data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.put("http://localhost:8080/api/auth/updateUsernameORMail",data);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const fetchAllContacts = createAsyncThunk(
    "users/fetchUsers",
    async (data, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get(`http://localhost:8080/api/contact/contacts`);
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const StatusChangeUser = createAsyncThunk(
    "users/StatusChangeUser",
    async (data:any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.put(`http://localhost:8080/api/contact/StatusContact`,data);
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
/************************ Get Single user ***********************/
export const fetchSingleUserExport = createSlice({
    name: "fetchSingleUserExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleUser.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(fetchSingleUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(fetchSingleUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
/************************ Change image ***********************/
        builder
            .addCase(ChangeImage.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(ChangeImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(ChangeImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ Get All users **************************/
export const AllUsers_Slice = createSlice({
    name: "AllUsers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder            
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })            
    }
})
/************************ Create Verif Code Forget Password Per Mail  **************************/
export const CreateVerifCodeForgetPasswordPerMailExport = createSlice({
    name: "CreateVerifCodeForgetPasswordPerMailExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CreateVerifCodeForgetPasswordPerMail.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(CreateVerifCodeForgetPasswordPerMail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(CreateVerifCodeForgetPasswordPerMail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })       
    }
})
/************************ newPasswordFromForgetPassword  **************************/
export const newPasswordFromForgetPasswordExport = createSlice({
    name: "newPasswordFromForgetPasswordExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(newPasswordFromForgetPassword.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(newPasswordFromForgetPassword.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(newPasswordFromForgetPassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })       
    }
})

/************************ Create Verif Code Forget Password Per Username  **************************/
export const CreateVerifCodeForgetPasswordPerUsernameExport = createSlice({
    name: "CreateVerifCodeForgetPasswordPerUsernameExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CreateVerifCodeForgetPasswordPerUsername.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(CreateVerifCodeForgetPasswordPerUsername.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(CreateVerifCodeForgetPasswordPerUsername.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })       
    }
})
/************************ SignIn  **************************/
export const SignInExport = createSlice({
    name: "SignInExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SignIn.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(SignIn.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(SignIn.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })       
    }
})
/************************ SignUp  **************************/
export const SignUpExport = createSlice({
    name: "SignUpExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SignUp.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(SignUp.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(SignUp.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })       
    }
})
/************************ CodeVerification  **************************/
export const CodeVerificationExport = createSlice({
    name: "CodeVerificationExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CodeVerification.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(CodeVerification.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(CodeVerification.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })       
    }
})
/************************ verify  **************************/
export const verifyExport = createSlice({
    name: "verifyExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(verify.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(verify.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(verify.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })       
    }
})
/************************ findByMail  **************************/
export const findByMailExport = createSlice({
    name: "findByMailExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(findByMail.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(findByMail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(findByMail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })       
    }
})
/************************ Update User  **************************/
export const UpdateUserExport = createSlice({
    name: "UpdateUserExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(UpdateUser.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(UpdateUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(UpdateUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })       
    }
})
/************************ findByUsername  **************************/
export const findByUsernameExport = createSlice({
    name: "findByUsernameExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(findByUsername.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(findByUsername.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(findByUsername.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })       
    }
})
/************************ findByUsername  **************************/
export const UpdatePasswordUserExport = createSlice({
    name: "UpdatePasswordUserExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(UpdatePasswordUser.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(UpdatePasswordUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(UpdatePasswordUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })       
    }
})
/************************ findByUsername  **************************/
export const UpdateUserUsernameORMailExprot = createSlice({
    name: "UpdateUserUsernameORMailExprot",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(UpdateUserUsernameORMail.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(UpdateUserUsernameORMail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(UpdateUserUsernameORMail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })       
    }
})
/************************ All Contacts  **************************/
export const fetchAllContactsExport = createSlice({
    name: "fetchAllContactsExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllContacts.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(fetchAllContacts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(fetchAllContacts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })       
    }
})
/************************ Get Single user ***********************/
export const fetchSingleUserExport2 = createSlice({
    name: "fetchSingleUserExport2",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleUser2.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(fetchSingleUser2.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(fetchSingleUser2.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
        }
    })
    /************************ Get Single user ***********************/
export const fetchSingleUserExport3 = createSlice({
    name: "fetchSingleUserExport3",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleUser3.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(fetchSingleUser3.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(fetchSingleUser3.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
        }
    })    /************************ Get Single user ***********************/
    export const fetchSingleUserExport4 = createSlice({
        name: "fetchSingleUserExport4",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchSingleUser4.pending, (state) => {
                    state.status = 'loading';
                    state.error = null
    
                })
                .addCase(fetchSingleUser4.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.record = action.payload;
                })
                .addCase(fetchSingleUser4.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                })
            }
        })
    