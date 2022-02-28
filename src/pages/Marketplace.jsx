/* react imports */
import { useEffect, useContext, useState } from "react";
import Page from "../components/Page";
import { NFTListing } from "../sections/marketplace";
import { Context } from "../store";
/* mui imports */
import { Container, Stack, Typography } from "@mui/material";
/* web3 imports */
import { getAllMarketItems } from "../utils/contractInterface";

// ----------------------------------------------------------------------

export default function Marketplace() {
  const { store } = useContext(Context);
  console.log(store)
  const [items, setState] = useState([]);
  const { provider, mktContract, nftContract } = store;
  useEffect(() => {
    (async () => {
      if (mktContract && nftContract) {
        const marketItems = await getAllMarketItems(nftContract, mktContract);
        setState(marketItems);
      }
    })();
  }, [mktContract, nftContract]);
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

          <NFTListing listings={items} />
        </Container>
    </Page>
  );
}
