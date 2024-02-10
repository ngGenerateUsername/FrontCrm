import { configureStore } from "@reduxjs/toolkit";
import Upload_Slice from "./user/Upload_Slice";
import Upload_Slice_PDF from "./user/Upload_Slice";
import { combineReducers } from "redux";

import {
  All_Entreprises,
  Add_Entreprise,
  UpdateEntrepriseExport,
  fetchSingleUserEntrepriseExport,
} from "./user/Entreprise_Slice";

import { SignUpFullExport } from "./user/SignUp_Slice";

import {
  PropEntrepriseExport,
  entreprisePerContactExport,
  entreprisePerPropExport,
  contactsPerEntrepriseExport,
  PropExport,
  CommerciauxPerEntrepriseExport,
  RespTicketPerEntrepriseExport,
} from "./user/Role_Slice";

import {
  SendMailInvitePropExport,
  SendMailInviteExport,
  SendMailForgetPasswordExport,
  SendMailCodeVerificationExport,
  SendMailContratExport
} from "./user/Mailer_Slice";

import {
  fetchSingleUserExport,
  AllUsers_Slice,
  fetchAllContactsExport,
  CreateVerifCodeForgetPasswordPerMailExport,
  CreateVerifCodeForgetPasswordPerUsernameExport,
  SignInExport,
  SignUpExport,
  CodeVerificationExport,
  verifyExport,
  findByMailExport,
  UpdateUserExport,
  findByUsernameExport,
  UpdatePasswordUserExport,
  UpdateUserUsernameORMailExprot,
  fetchSingleUserExport2,
  fetchSingleUserExport3,
  fetchSingleUserExport4
} from "./user/Users_Slice";
import {
  AllTicketsExport,
  AddTicketExport,
  AllticketsPerContactExport,
  DetailsTicketExport,
  SetStatusTicketExport,
  AllticketsPerRespTicketExport,
} from "./user/ticket_Slice";

import {
  UpdateClientExport,
  AddClientExport,
  fetchClientsExport,
  fetchSingleClientExport,
} from "./user/Client_Slice";

import {
  MyCLientsUserExport,
  CLientsOfMyEntrepriseExport,
  AddRelationClientUserExport,
  MyContactsExport,
  ListClientsPerContactExport,
  ListEntreprisePerClientExport,
  CLientsOfMyEntrepriseJustClientsExport,
} from "./user/RelationClientUser_Slice";
import {
  ImportCSVContactsExport,
  ImportExelContactsExport,
  ImportCSVClientsExport,
  ImportExelClientsExport,
} from "./user/Import_Slice";

import {
  AllActivitesExport,
  AddActiviteExport,
  ActivitesForOpportuniteExport,
  DetailsActiviteExport,
  SetActivitetermineExport,
  SetActiviteencoursExport
} from "./user/Activity_Slice";
import downloadReducer from "./user/downloadSlice";
import {
  AllOpportunitesExport,
  AllPISTEOpportunitesExport,
  AllPOTENTIELOpportunitesExport,
  AllCONFIRMEEOpportunitesExport,
  AllPERDUEOpportunitesExport,
  AllSIGNEEOpportunitesExport,
  AddOpportuniteExport,
  DetailsOpportuniteExport,
  SetOpportunitePisteExport,
  SetOpportunitePerdueExport,
  SetOpportuniteSigneeExport,
  SetOpportuniteConfirmeeExport,
  SetOpportunitePotentielExport,
  updatePrioriteExport,
  ActifOpportunitesExport,
  InactifOpportunitesExport,
  DeleteOpportuniteExport,
} from "./user/Oportunity_Slice";
import {
  AddContratExport,
  AllContratsExport,
  DetailsContratExport,
} from "./user/Contrat_Slice";
import {
  AddNotesExport,
  AllNotesExport,
  NotesForActiviteExport,
  DetailsNoteExport,
  deleteNoteExport,
  NotesForOpportuniteExport,
} from "./user/Notes_Slice";
import {
  AddFileExport,
  AllFilesExport,
  DetailsFileExport,
  FilesForContratExport,
  deleteFileExport,
} from "./user/File_Slice";
import {
  AddMsgExport,
  AllMsgsExport,
  DetailsMsgExport,
  SetStatusMsgExport
} from './user/Msg_Slice'
import {  AllCategoriesExport, AllProductExport, ProductsByCategoryExport } from "./Offre/ProductSlices";
import { AllOffreExport, OffreDetailsExport, UpdateOffreExport } from "./Offre/OffreSlices";
import { AllFactureByComExport, FactureDetailsExport } from "./Facture/FactureSlices";
import { AddDevisExport, AllDevisByComsExport, DetailDevisExport } from "./devis/devis_Slice";


import {
  AllCategorieExport,
  DeleteCategorieExport,
  ModifierCategorieExport
} from "./categorie/categorie_Slice";

import {
  AllProduitExport,
  DeleteProduitExport,
  ModifierProduitExport
} from "./produit/produit_Slice";

const rootReducer = combineReducers({
  /************************ Users_Slice  **************************/

  fetchSingleUserExport: fetchSingleUserExport.reducer,
  allUsers: AllUsers_Slice.reducer,
  CreateVerifCodeForgetPasswordPerMailExport:
    CreateVerifCodeForgetPasswordPerMailExport.reducer,
  CreateVerifCodeForgetPasswordPerUsernameExport:
    CreateVerifCodeForgetPasswordPerUsernameExport.reducer,
  SignInExport: SignInExport.reducer,
  SignUpExport: SignUpExport.reducer,
  CodeVerificationExport: CodeVerificationExport.reducer,
  findByMailExport: findByMailExport.reducer,
  UpdateUserExport: UpdateUserExport.reducer,
  findByUsernameExport: findByUsernameExport.reducer,
  UpdatePasswordUserExport: UpdatePasswordUserExport.reducer,
  UpdateUserUsernameORMailExprot: UpdateUserUsernameORMailExprot.reducer,
  fetchAllContactsExport: fetchAllContactsExport.reducer,
  fetchSingleUserExport2: fetchSingleUserExport2.reducer,
  fetchSingleUserExport3: fetchSingleUserExport3.reducer,
  fetchSingleUserExport4:fetchSingleUserExport4.reducer,

  /************************ Entreprise_Slice  **************************/

  All_Entreprises: All_Entreprises.reducer,
  Add_Entreprise: Add_Entreprise.reducer,
  UpdateEntrepriseExport: UpdateEntrepriseExport.reducer,
  fetchSingleUserEntrepriseExport: fetchSingleUserEntrepriseExport.reducer,

  /************************ Upload_Slice  **************************/
  uploadsPDF: Upload_Slice_PDF.reducer,
  uploads: Upload_Slice.reducer,
  SendMailInvitePropExport: SendMailInvitePropExport.reducer,
  SendMailInviteExport: SendMailInviteExport.reducer,
  SendMailForgetPasswordExport: SendMailForgetPasswordExport.reducer,
  SendMailCodeVerificationExport: SendMailCodeVerificationExport.reducer,
  SendMailContratExport: SendMailContratExport.reducer,
  verifyExport: verifyExport.reducer,

  /************************ Upload_Slice  **************************/

  SignUpFullExport: SignUpFullExport.reducer,

  /************************ Role_Slice  **************************/

  PropEntrepriseExport: PropEntrepriseExport.reducer,
  entreprisePerContactExport: entreprisePerContactExport.reducer,
  entreprisePerPropExport: entreprisePerPropExport.reducer,
  contactsPerEntrepriseExport: contactsPerEntrepriseExport.reducer,
  PropExport: PropExport.reducer,
  CommerciauxPerEntrepriseExport: CommerciauxPerEntrepriseExport.reducer,
  RespTicketPerEntrepriseExport: RespTicketPerEntrepriseExport.reducer,

  /************************ Ticket_Slice  **************************/

  AllTicketsExport: AllTicketsExport.reducer,
  AddTicketExport: AddTicketExport.reducer,
  AllticketsPerContactExport: AllticketsPerContactExport.reducer,
  DetailsTicketExport: DetailsTicketExport.reducer,
  SetStatusTicketExport: SetStatusTicketExport.reducer,
  AllticketsPerRespTicketExport: AllticketsPerRespTicketExport.reducer,


  /************************ Client_Slice  **************************/

  UpdateClientExport: UpdateClientExport.reducer,
  AddClientExport: AddClientExport.reducer,
  fetchClientsExport: fetchClientsExport.reducer,
  fetchSingleClientExport: fetchSingleClientExport.reducer,

  /************************ Opportunity_Slice  **************************/

  AddOpportuniteExport: AddOpportuniteExport.reducer,
  DetailsOpportuniteExport: DetailsOpportuniteExport.reducer,
  AllOpportunitesExport: AllOpportunitesExport.reducer,
  AllPISTEOpportunitesExport: AllPISTEOpportunitesExport.reducer,
  AllPOTENTIELOpportunitesExport: AllPOTENTIELOpportunitesExport.reducer,
  AllCONFIRMEEOpportunitesExport: AllCONFIRMEEOpportunitesExport.reducer,
  AllSIGNEEOpportunitesExport: AllSIGNEEOpportunitesExport.reducer,
  AllPERDUEOpportunitesExport: AllPERDUEOpportunitesExport.reducer,
  SetOpportunitePisteExport: SetOpportunitePisteExport.reducer,
  SetOpportunitePerdueExport: SetOpportunitePerdueExport.reducer,
  SetOpportuniteSigneeExport: SetOpportuniteSigneeExport.reducer,
  SetOpportuniteConfirmeeExport: SetOpportuniteConfirmeeExport.reducer,
  SetOpportunitePotentielExport: SetOpportunitePotentielExport.reducer,
  updatePrioriteExport: updatePrioriteExport.reducer,
  DeleteOpportuniteExport: DeleteOpportuniteExport.reducer,
  InactifOpportunitesExport:InactifOpportunitesExport.reducer,
  ActifOpportunitesExport: ActifOpportunitesExport.reducer,

  /************************ Activity_Slice  **************************/

  AddActiviteExport: AddActiviteExport.reducer,
  AllActivitesExport: AllActivitesExport.reducer,
  ActivitesForOpportuniteExport: ActivitesForOpportuniteExport.reducer,
  DetailsActiviteExport: DetailsActiviteExport.reducer,
  SetActivitetermineExport: SetActivitetermineExport.reducer,
  SetActiviteencoursExport: SetActiviteencoursExport.reducer,
  /************************ Contrat_Slice  **************************/

  AddContratExport: AddContratExport.reducer,
  AllContratsExport: AllContratsExport.reducer,
  DetailsContratExport: DetailsContratExport.reducer,

  /************************ File_Slice  **************************/

  AddFileExport: AddFileExport.reducer,
  AllFilesExport: AllFilesExport.reducer,
  DetailsFileExport: DetailsFileExport.reducer,
  FilesForContratExport: FilesForContratExport.reducer,
  deleteFileExport: deleteFileExport.reducer,
  download: downloadReducer,
    /************************ Notes_Slice  **************************/

    AddNotesExport: AddNotesExport.reducer,
    AllNotesExport: AllNotesExport.reducer,
    DetailsNoteExport: DetailsNoteExport.reducer,
    NotesForActiviteExport: NotesForActiviteExport.reducer,
    deleteNoteExport: deleteNoteExport.reducer,
    NotesForOpportuniteExport: NotesForOpportuniteExport.reducer,
  /************************ Client_Slice  **************************/

  MyCLientsUserExport: MyCLientsUserExport.reducer,
  CLientsOfMyEntrepriseExport: CLientsOfMyEntrepriseExport.reducer,
  AddRelationClientUserExport: AddRelationClientUserExport.reducer,
  MyContactsExport: MyContactsExport.reducer,
  ListClientsPerContactExport: ListClientsPerContactExport.reducer,
  ListEntreprisePerClientExport: ListEntreprisePerClientExport.reducer,
  CLientsOfMyEntrepriseJustClientsExport:CLientsOfMyEntrepriseJustClientsExport.reducer,
    ImportCSVContactsExport: ImportCSVContactsExport.reducer,
    ImportExelContactsExport: ImportExelContactsExport.reducer,
    ImportCSVClientsExport:ImportCSVClientsExport.reducer,
    ImportExelClientsExport:ImportExelClientsExport.reducer,
    
  /************************ Msg_Slice  **************************/

    AddMsgExport:AddMsgExport.reducer,
    AllMsgsExport:AllMsgsExport.reducer,
    DetailsMsgExport:DetailsMsgExport.reducer,
    SetStatusMsgExport:SetStatusMsgExport.reducer  ,  

 /************************ Offre_Slice  **************************/
    AllOffreExport:AllOffreExport.reducer,
    AllProductExport:AllProductExport.reducer,
    OffreDetailsExport:OffreDetailsExport.reducer,
    UpdateOffreExport:UpdateOffreExport.reducer,
    ProductsByCategoryExport:ProductsByCategoryExport.reducer,
    AllCategoriesExport:AllCategoriesExport.reducer,

 /************************ facture_Slice  **************************/
    AllFactureByComExport:AllFactureByComExport.reducer,
    FactureDetailsExport:FactureDetailsExport.reducer,
 /************************ Devis_Slice  **************************/

 AllDevisByComsExport:AllDevisByComsExport.reducer,
 AddDevisExport:AddDevisExport.reducer,
 DetailDevisExport:DetailDevisExport.reducer,
    
 

        /************************ Categorie_Slice  **************************/
        AllCategorieExport: AllCategorieExport.reducer,
    
         /************************ Produit_Slice  **************************/
         AllProduitExport: AllProduitExport.reducer,
         DeleteProduitExport: DeleteProduitExport.reducer,
         ModifierProduitExport: ModifierProduitExport.reducer
});
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer: rootReducer,
});

export default store;
