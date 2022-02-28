import React, {useEffect, useState, useContext} from "react";
// material
import { Container, Stack, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import { NFTListing } from "../sections/marketplace";
//
import PRODUCTS from "../_mocks_/products";
import { getAllUserItems } from "../utils/contractInterface";
import {Context} from '../store'
 // ----------------------------------------------------------------------

export default function UserCollection() {
  const {store} = useContext(Context)
  const {nftContract, mktContract} = store
  const [items, setItems] = useState([])
  useEffect(() => {
    if (nftContract && mktContract){
    (async() => {
      const retrievedItems = await getAllUserItems(nftContract, mktContract)
      setItems(retrievedItems)
    })()
    }
  }, [store])
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

        <NFTListing listings={items} />
      </Container>
    </Page>
  );
}
