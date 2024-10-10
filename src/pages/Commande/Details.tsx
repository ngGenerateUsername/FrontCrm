// Chakra imports
import {

  } from "@chakra-ui/react";
  
  // Custom components
  
  // Assets
  import { BsCircleFill } from "react-icons/bs";
  import { GrFormAdd } from "react-icons/gr";
  import { MdPersonRemoveAlt1 } from "react-icons/md";
  import { useRef, useState, useEffect } from "react";
  import { useHistory } from "react-router-dom";
  
  import { useDispatch, useSelector } from "react-redux";
  import { ModifierProduit } from "state/produit/produit_Slice";
  import { FindCategorieById } from "state/categorie/categorie_Slice";
import { updateCmdQuantity } from "state/Commande/Commande_slice";

  
  export default function Details() {
    return(
      <p>hellow</p>
    );
  }