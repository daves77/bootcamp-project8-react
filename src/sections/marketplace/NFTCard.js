/* react imports */
import { Link as RouterLink } from 'react-router-dom';
/* proptype verification imports */
import PropTypes from 'prop-types';
/* mui imports */
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
//
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------

const NFTImageStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

NFTCard.propTypes = {
  listing: PropTypes.object
};

export default function NFTCard({ listing }) {
  const {tokenId, price, image, seller} = listing

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )} */}
        <NFTImageStyle alt={"test"} src={`https://gateway.pinata.cloud/ipfs/${image}`} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {seller}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1" sx={{display: "flex", alignItems:"center"}}>
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
            </Typography>
            <Iconify icon={'cib:ethereum'} sx={{width: 14, height:14}}/>
            &nbsp;
            {price} 
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
