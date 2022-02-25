import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box } from '@mui/material';

import images from '../static/img';

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  return (
    <RouterLink to="/">
      <Box component="img" src={images.closedLandLogo} sx={{ width: 120, height: 80, ...sx }} />
    </RouterLink>
  );
}
