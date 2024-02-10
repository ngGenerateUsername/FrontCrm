import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface SignUp {
  // define your record type here
}

interface State {
  record: SignUp[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  record: [],
  status: "idle",
  error: null,
};

export const SignUp = createAsyncThunk(
  "SignUp/SignUp",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log("test 1");
      const result = await axios.post(
        "http://localhost:8080/api/auth/signup",
        data
      );
      console.log(result.data);
      const result2 = await axios.get(
        "http://localhost:8080/api/contact/CodeVerification?id=" + result.data
      );
      console.log(result2.data);
      console.log("test 1");
      const result3 = await axios.post("http://localhost:9090/sendMail", {
        to: data.email,
        subject: "Welcome To CRM",
        html:
          "<div style='text-align: center;color: #7C7C7C;'><h2 class='h2' style='color:#968ADB'>Bonjour " +
          data.email +
          " , </h2><br><h3>Vous êtes presque prêt à bénéficier du Notre CRM<span style='font-weight:500'></h3><h4>Cliquez simplement sur le Lien ci-dessous pour vérifier votre adresse e-mail.</h4><br><br><a href='http://localhost:3000/horizon-ui-chakra-ts#/auth/verify?verify=" +
          result2.data +
          "'><input style='background-color:#968ADB;border:none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size:16px;cursor: pointer;border-radius: 12px;display: block;margin-right: auto;margin-left: auto;' type='button' value='Verifier votre compte'></a></div>",
      });

      console.log(result, result3);

      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const AddContact = createAsyncThunk(
  "AddContact/AddContact",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log("test 1");
      const result = await axios.post(
        "http://localhost:8080/api/auth/signup",
        data  
      );
      console.log(result.data);
      const result2 = await axios.get(
        "http://localhost:8080/api/contact/CodeVerification?id=" + result.data
      );
      console.log(result2.data);
      console.log("test 1");
      const result3 = await axios.post("http://localhost:9090/sendMail", {
        to: data.email,
        subject: "Welcome To CRM",
        html:
          "<div style='text-align: center;color: #7C7C7C;'><h2 class='h2' style='color:#968ADB'>Bonjour " +
          data.email +
          " , </h2><br><h3>Bienvenue A Notre CRM<span style='font-weight:500'></h3><h4>Cliquez simplement sur le Lien ci-dessous pour verifer votre compte en tant que Contact</h4><h4>Votre Nom d'utilisateur : " +
          data.username +
          "</h4><h4>Votre Mot de passe : " +
          data.password +
          "</h4><br><br><a href='http://localhost:3000/horizon-ui-chakra-ts#/auth/verify?verify="+result2.data+"'><input style='background-color:#968ADB;border:none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size:16px;cursor: pointer;border-radius: 12px;display: block;margin-right: auto;margin-left: auto;' type='button' value='Verifer votre compte'></a></div>",
      });

      console.log(result, result3);

      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/************************ Add  **************************/
export const SignUpFullExport = createSlice({
  name: "SignUpExport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SignUp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(SignUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.record = action.payload;
      })
      .addCase(SignUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
