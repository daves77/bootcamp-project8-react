/* react imports */
import { useContext } from "react";
import { Context } from "./../store";
import Page from "../components/Page";
import CreateUserProfile from "../components/CreateUserProfile";
import EditProfile from "../components/EditProfile";

// ----------------------------------------------------------------------



export default function UserProfile() {
  const { store } = useContext(Context);
  const { user } = store;
  return (
    <Page title="Closed Land | User Profile">
      
      {!user.userName&&<CreateUserProfile/>}
      {user.userName&&<EditProfile/>}      
    </Page>
  );
}