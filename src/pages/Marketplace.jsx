import React from 'react'
// material
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  NFTListing,
} from '../sections/marketplace';
//
import PRODUCTS from '../_mocks_/products';

// ----------------------------------------------------------------------

export default function Marketplace() {

  return (
    <Page title="Closed Land | Marketplace">
      <Container>
        <Typography variant="h2" sx={{ mb: 5 }}>
          Marketplace
        </Typography>
        <NFTListing listings={PRODUCTS} />
      </Container>
    </Page>
  );
}
