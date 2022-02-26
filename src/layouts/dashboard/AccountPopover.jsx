import { useRef, useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ethers } from "ethers";
// material
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
// components
import Iconify from "../../components/Iconify";
import MenuPopover from "../../components/MenuPopover";
//
import account from "../../_mocks_/account";
import { Context, userSignIn } from "../../store";

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
    const accountAddress = await signer.getAddress();

    /* "eth_requestAccounts" is what prompts MetaMask pop-up to ask user to accept or reject request */
    // await provider.send("eth_requestAccounts", []);
    
    dispatch(userSignIn({ userAddress: accountAddress, name: "david" }));
    
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
                {account.displayName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                noWrap
              >
                {account.email}
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
              <Button fullWidth color="inherit" variant="outlined">
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
