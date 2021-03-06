/* react imports */
import Iconify from "../../components/Iconify";
import AccountPopover from "./AccountPopover";
import Notification from "../../components/Notification";
/* proptype verification imports */
import PropTypes from "prop-types";
/* mui  imports */
import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton } from "@mui/material";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.1),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {
  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton
          onClick={onOpenSidebar}
          sx={{ mr: 1, color: "text.primary", display: { lg: "none" } }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <Notification/>
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
