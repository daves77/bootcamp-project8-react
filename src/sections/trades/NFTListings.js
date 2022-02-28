/* react imports */
import NFTCard from './NFTCard';
/* proptype verification imports */
import PropTypes from 'prop-types';
/* mui imports */
import { Grid } from '@mui/material';

// ----------------------------------------------------------------------

NFTListings.propTypes = {
  listings: PropTypes.array.isRequired
};

export default function NFTListings({ listings, trade,setTrade, setOffereeAddress, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {listings.map((listing) => (
        <Grid key={listing.tokenId} item xs={12} sm={6} md={4}>
          <NFTCard listing={listing} trade={trade} setTrade={setTrade} setOffereeAddress={setOffereeAddress}/>
        </Grid>
      ))}
    </Grid>
  );
}
