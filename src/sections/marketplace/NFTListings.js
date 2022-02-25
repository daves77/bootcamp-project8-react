import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import NFTCard from './NFTCard';

// ----------------------------------------------------------------------

NFTListings.propTypes = {
  listings: PropTypes.array.isRequired
};

export default function NFTListings({ listings, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {listings.map((listing) => (
        <Grid key={listing.id} item xs={12} sm={6} md={3}>
          <NFTCard listing={listing} />
        </Grid>
      ))}
    </Grid>
  );
}
