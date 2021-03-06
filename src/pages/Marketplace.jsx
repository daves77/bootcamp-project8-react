/* react imports */
import { useEffect, useContext, useState } from "react";
import Page from "../components/Page";
import { NFTListing } from "../sections/marketplace";
import { Context, getItems } from "../store";
/* mui imports */
import { Container, Stack, Typography } from "@mui/material";
/* web3 imports */
import { getAllMarketItems } from "../utils/contractInterface";

// ----------------------------------------------------------------------

export default function Marketplace() {
  const { store, dispatch } = useContext(Context);
  const {items, nftContract, mktContract} = store
  
  useEffect(() => {
   (async() => {
     if (nftContract && mktContract){

    const retrievedItems = await getAllMarketItems(nftContract, mktContract)
    dispatch(getItems(retrievedItems))
     }
   })()
  }, [])

  const sortedItems = items.filter(item => item.status === "available")

  return (
    <Page title="Closed Land | Marketplace">

        <Container>
          <Typography variant="h2" sx={{ mb: 5 }}>
            Marketplace
          </Typography>

          <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mb: 5 }}
          ></Stack>

          <NFTListing listings={sortedItems} />
        </Container>
    </Page>
  );
}
