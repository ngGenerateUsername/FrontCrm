
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Mail {
    // define your record type here
}

interface State {
    record: Mail[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: State = {
    record: [],
    status: 'idle',
    error: null
};



export const SendMailInviteProp = createAsyncThunk(
    "Mail/SendMailInviteProp",
    async (data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.post(`http://localhost:9090/sendMail`,    
              {
                to: data.email, subject: "Welcome To CRM",
                html: "<div style='text-align: center;color: #7C7C7C;'><h2 class='h2' style='color:#968ADB'>Bonjour " + data.email + " , </h2><br><h3>Vous êtes presque prêt à bénéficier du Notre CRM<span style='font-weight:500'></h3><h4>Cliquez simplement sur le Lien ci-dessous pour acceder au site web</h4><br><br><a href='http://localhost:3000/horizon-ui-chakra-ts#/auth/sign-up'><input style='background-color:#968ADB;border:none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size:16px;cursor: pointer;border-radius: 12px;display: block;margin-right: auto;margin-left: auto;' type='button' value='Passer au CRM'></a></div>"
              });
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const SendMailInvite = createAsyncThunk(
    "Mail/SendMailInvites",
    async (data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.post(`http://localhost:9090/sendMail`,    
            {
                to: data.email, subject: "Welcome To CRM",
                html: "<div style='text-align: center;color: #7C7C7C;'><h2 class='h2' style='color:#968ADB'>Bonjour " + data.email + " , </h2><br><h3>Vous êtes presque prêt à bénéficier du Notre CRM<span style='font-weight:500'></h3><h4>Cliquez simplement sur le Lien ci-dessous pour creer votre compte en tant que " + data.Role + "</h4><br><br><a href=http://localhost:3000/horizon-ui-chakra-ts#/auth/sign-upCommercialOrResponsaable?role=" + data.Role + "&email=" + data.email + "&entreprise=" + data.entreprise + "><input style='background-color:#968ADB;border:none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size:16px;cursor: pointer;border-radius: 12px;display: block;margin-right: auto;margin-left: auto;' type='button' value='Creer votre compte'></a></div>"
              });
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const SendMailForgetPassword = createAsyncThunk(
    "Mail/SendMailForgetPassword",
    async (data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.post(`http://localhost:9090/sendMail`,    
            { to : data.mail , subject : "Réinitialiser mot de passe", 
            html:"<div style='text-align: center;color: #7C7C7C;'><h2 class='h2' style='color:#968ADB'>Bonjour "+data.mail+" , </h2><br><h3>Vous avez oublie votre mot de passe ? Rien de grave !<span style='font-weight:500'></h3><h4>Cliquez simplement sur le Lien ci-dessous pour creer un nouveau mot de passe.</h4><br><br><a href='http://localhost:3000/CRM#/auth/reset-password?code="+data.verificationCodeForgetPassword+"'><input style='background-color:#968ADB;border:none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size:16px;cursor: pointer;border-radius: 12px;display: block;margin-right: auto;margin-left: auto;' type='button' value='Réinitialiser mot de passe'></a></div>"});
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const SendMailCodeVerification = createAsyncThunk(
    "Mail/CodeVerification",
    async (data : any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.post(`http://localhost:9090/sendMail`,    
            {
        to: data.email,
        subject: "Welcome To CRM",
        html:
          "<div style='text-align: center;color: #7C7C7C;'><h2 class='h2' style='color:#968ADB'>Bonjour " +
          data.email +
          " , </h2><br><h3>Vous êtes presque prêt à bénéficier du Notre CRM<span style='font-weight:500'></h3><h4>Cliquez simplement sur le Lien ci-dessous pour vérifier votre adresse e-mail.</h4><br><br><a href='http://localhost:3000/horizon-ui-chakra-ts#/auth/verify?verify=" +
          data.code +
          "'><input style='background-color:#968ADB;border:none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size:16px;cursor: pointer;border-radius: 12px;display: block;margin-right: auto;margin-left: auto;' type='button' value='Verifier votre compte'></a></div>",
      });
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const SendMailContrat = createAsyncThunk(
    "Mail/Contrat",
    async ({ data, data2 , data3, data4, data5}:any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.post(`http://localhost:9090/sendMail`,    
            {
        to: data.mail,
        subject: "CRM Contrat créé",
        html: "<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>Nouveau contrat créé</title><style>body{font-family:Arial,sans-serif;margin:0;padding:0;background-color:#F2F2F2;}.container{max-width:600px;margin:0 auto;padding:20px;background-color:#FFFFFF;border-radius:5px;box-shadow:0 2px 4px rgba(0,0,0,0.1);background-image:url('https://example.com/background-image.jpg');background-size:cover;background-position:center;}h1{font-size:24px;color:#333333;text-align:center;margin-top:0;}p{color:#555555;line-height:1.5;margin-bottom:20px;}.button-container{text-align:center;margin-bottom:20px;}.button{display:inline-block;padding:10px 20px;background-color:#DED6D4;color:#FFFFFF;text-decoration:none;border-radius:5px;border-color:#000}.info{margin-bottom:20px;text-align:left;}.info p{margin:5px 0;}.signature{margin-top:40px;text-align:right;}.signature p{margin-bottom:10px;}.footer{margin-top:40px;font-size:12px;color:#999999;text-align:center;}</style></head><body><div class=\"container\"><h1>Nouveau contrat créé</h1><p>Cher(e) "+data.nom+",</p><p>Nous sommes heureux de vous informer qu'un nouveau contrat a été créé dans l'opportunité suivante :</p><div class=\"info\"><p><strong>Opportunité :</strong> "+data2.titre+"</p><p><strong>Fournisseur :</strong> "+data4.nomEntreprise+"</p><p><strong>Date du contrat :</strong> "+data3.dateSignature+"</p></div><div class=\"button-container\"><p><strong>Vous pouvez consulter votre contrat en cliquant sur ce bouton:</strong></p><a class=\"button\" href=\"http://localhost:3000/CRM#/opportunite/details/DetailsContrat?id="+data3.idContrat+"\">Consulter le contrat</a></div><p>Merci et meilleures salutations,</p><div class=\"signature\"><p>"+data5.nom+" "+data5.prenom+"</p><p>"+data4.nomEntreprise+"</p></div><div class=\"footer\"><p>Ce message est confidentiel et destiné uniquement à la personne ou à l'entité à qui il est adressé. Si vous n'êtes pas le destinataire prévu, veuillez en informer immédiatement l'expéditeur et supprimer ce message.</p><p>"+data4.nomEntreprise+"|"+data4.adresse+"|"+data4.numTel+"</p></div></div></body></html>"
      });
            //console.log(response.data,'response.data')
            console.log(response.data)
            return response.data;


        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

/************************ SendMailInvitePropExport  **************************/
export const SendMailInvitePropExport = createSlice({
    name: "SendMailInvitePropExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SendMailInviteProp.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(SendMailInviteProp.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(SendMailInviteProp.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ SendMailInviteExport **************************/
export const SendMailInviteExport = createSlice({
    name: "SendMailInviteExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SendMailInvite.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(SendMailInvite.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(SendMailInvite.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

/************************ SendMailForgetPassword **************************/
export const SendMailForgetPasswordExport = createSlice({
    name: "SendMailForgetPasswordExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SendMailForgetPassword.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(SendMailForgetPassword.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(SendMailForgetPassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
/************************ SendMailCodeVerification **************************/
export const SendMailCodeVerificationExport = createSlice({
    name: "SendMailCodeVerificationExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SendMailCodeVerification.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(SendMailCodeVerification.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(SendMailCodeVerification.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

/************************ SendMailContrat **************************/
export const SendMailContratExport = createSlice({
    name: "SendMailContratExport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SendMailContrat.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(SendMailContrat.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.record = action.payload;
            })
            .addCase(SendMailContrat.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})