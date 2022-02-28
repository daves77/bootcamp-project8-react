/* react imports */
import { forwardRef } from "react";
import { Helmet } from "react-helmet-async";
/* proptype verification imports */
import PropTypes from "prop-types";
/* mui  imports */
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

/* 
1. when using <Page ref={ref}></Page>, forwardRef() allows reference to be made to <Box> element within the <Page> parent component (https://blog.logrocket.com/cleaning-up-the-dom-with-forwardref-in-react/)
*/
const Page = forwardRef(({ children, title = "", ...other }, ref) => (
  <Box ref={ref} {...other}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </Box>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
