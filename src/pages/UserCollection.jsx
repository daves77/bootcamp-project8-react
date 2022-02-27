import React from "react";
// material
import { Container, Stack, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import { NFTListing } from "../sections/marketplace";
//
import PRODUCTS from "../_mocks_/products";

// ----------------------------------------------------------------------

export default function UserCollection() {
  return (
    <Page title="Closed Land | Collection">
      <Container>
        <Typography variant="h2" sx={{ mb: 5 }}>
          My Collection
      </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        ></Stack>

        <NFTListing listings={PRODUCTS} />
      </Container>
    </Page>
  );
}
