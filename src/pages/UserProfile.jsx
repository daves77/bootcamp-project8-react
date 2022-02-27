// material
import { Container, Typography, TextField, Button } from "@mui/material";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
// components
import Page from "../components/Page";
import { useState, useRef, useContext } from "react";
import { Context, createProviders } from "./../store";
import axios from "axios";
import CreateUserProfile from "../components/CreateUserProfile";
import EditProfile from "../components/EditProfile";

// ----------------------------------------------------------------------



export default function UserProfile() {
  const { store, dispatch } = useContext(Context);
  const { user } = store;
  return (
    <Page title="Closed Land | User Profile">
      
      {!user.userName&&<CreateUserProfile/>}
      {user.userName&&<EditProfile/>}      
    </Page>
  );
}