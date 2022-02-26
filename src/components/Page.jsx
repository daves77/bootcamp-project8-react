/* 
1. prop-types chks to make sure props are of the correct types  (https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes)
*/
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { forwardRef } from "react";
// material
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
