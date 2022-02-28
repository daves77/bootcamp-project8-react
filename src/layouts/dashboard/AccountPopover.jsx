/* react imports */
import { useRef, useState, useContext } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Context, userSignIn } from "../../store";
import Iconify from "../../components/Iconify";
import MenuPopover from "../../components/MenuPopover";
/* mui  imports */
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
/* web3, db  imports */
import { ethers } from "ethers";
import MarketListing from "../../contracts/MarketListing.json";
import NFT from "../../contracts/NFT.json";
import { mktAdd, nftAdd } from "../../contracts/addressSetting.js";
import axios from "axios";
//
import account from "../../_mocks_/account";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: "eva:home-fill",
    linkTo: "/",
  },
  {
    label: "Profile",
    icon: "eva:person-fill",
    linkTo: "#",
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
    linkTo: "#",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { store, dispatch } = useContext(Context);
  const { user } = store;
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleWalletConnection = async () => {
    if (!window.ethereum) {
      //return modal asking them to create a metamask wallet
      return alert("Time to get MetaMask good person!");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();

    /* "eth_requestAccounts" is what prompts MetaMask pop-up to ask user to accept or reject request */
    await provider.send("eth_requestAccounts", []);
    const accountAddress = await signer.getAddress();

    let mktSignerContract = new ethers.Contract(
      mktAdd,
      MarketListing.abi,
      signer
    );

    let nftSignerContract = new ethers.Contract(nftAdd, NFT.abi, signer);
    const result = await axios.get(`http://localhost:3004/${accountAddress}`);
    if (result.data) {
      dispatch(
        userSignIn(
          { userAddress: accountAddress, userName: result.data.userName },
          signer,
          nftSignerContract,
          mktSignerContract
        )
      );
      return;
    }
    dispatch(
      userSignIn(
        { userAddress: accountAddress, userName: null },
        signer,
        nftSignerContract,
        mktSignerContract
      )
    );
    navigate("/profile");
  };

  return (
    <>
      {user ? (
        <>
          <IconButton
            ref={anchorRef}
            onClick={handleOpen}
            sx={{
              padding: 0,
              width: 44,
              height: 44,
              ...(open && {
                "&:before": {
                  zIndex: 1,
                  content: "''",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  position: "absolute",
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                },
              }),
            }}
          >
            <Avatar src={account.photoURL} alt="photoURL" />
          </IconButton>

          <MenuPopover
            open={open}
            onClose={handleClose}
            anchorEl={anchorRef.current}
            sx={{ width: 220 }}
          >
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle1" noWrap>
                {user.userName}
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            {MENU_OPTIONS.map((option) => (
              <MenuItem
                key={option.label}
                to={option.linkTo}
                component={RouterLink}
                onClick={handleClose}
                sx={{ typography: "body2", py: 1, px: 2.5 }}
              >
                <Iconify
                  icon={option.icon}
                  sx={{
                    mr: 2,
                    width: 24,
                    height: 24,
                  }}
                />

                {option.label}
              </MenuItem>
            ))}

            <Box sx={{ p: 2, pt: 1.5 }}>
              <Button
                onClick={() => {
                  window.location.assign("/");
                }}
                fullWidth
                color="inherit"
                variant="outlined"
              >
                Logout
              </Button>
            </Box>
          </MenuPopover>
        </>
      ) : (
        <Button variant="contained" onClick={handleWalletConnection}>
          Connect Wallet
        </Button>
      )}
    </>
  );
}
