/* react imports */
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context, createProfile } from "../store";
/* mui  imports */
import { Container, Typography, TextField, Button } from "@mui/material";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
/* db  imports */
import axios from "axios";

export default function EditProfile() {
  const [userNameInputErr, setUserNameInputErr] = useState(false);
  const navigate = useNavigate();
  const { store, dispatch } = useContext(Context);
  const { user } = store;

  const userNameInput = useRef();

  const doSubmit = (evt) => {
    evt.preventDefault();
    setUserNameInputErr(false);
    const input = userNameInput.current.value.toLowerCase();
    if (input === "" || /[<>=@{};]/.test(input)) {
      alert("dude u ain't enter no nuthing or entered illegal characters");
      setUserNameInputErr(true);
    } else {
      axios
        .put("http://localhost:3004", {
          userName: input,
          userAdd: user.userAddress,
        })
        .then((result) => {
          dispatch(
            createProfile({
              userAddress: result.data.userAdd,
              userName: result.data.userName,
            })
          );
        });
      navigate("/");
    }
  };

  return (
    <Container>
      <Typography variant="h2" sx={{ mb: 5 }}>
        User profile
      </Typography>
      <h2> Edit your username</h2>
      <form noValidate autoComplete="off" onSubmit={doSubmit}>
        <TextField
          required
          inputRef={userNameInput}
          color="secondary"
          placeholder="any user name you like, <>=@{}; characters not allowed"
          variant="outlined"
          className={null}
          error={userNameInputErr}
        />
        <br></br>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
