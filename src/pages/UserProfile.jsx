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
  console.log("This is user", user);
  return (
    <Page title="Closed Land | User Profile">
      {user === null ? (
        <p>Please connect an account to Metamask before attempting to create/edit profile</p>
      ) : !user.userName ? (
        <CreateUserProfile />
      ) : (
        <EditProfile />
      )}
    </Page>
  );
}
