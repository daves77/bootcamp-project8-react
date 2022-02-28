import React, { useEffect, useState, useContext } from 'react';
// material
import { Container, Stack, Typography, Grid } from '@mui/material';
// components
import Page from '../components/Page';
import { NFTListing } from '../sections/marketplace';
import TradeOffer from '../sections/user/TradeOffer'
//
import { getAllTradeOffers } from '../utils/contractInterface';
import { Context } from '../store';
// ----------------------------------------------------------------------

export default function UserCollection() {
  const [offers, setOffers] = useState([])
	const { store } = useContext(Context);
	const { items, signer , mktContract} = store;
  
  const userItems = items.filter(item => item.owner === signer)
  
  useEffect(() => {
    (async() => {
      if (mktContract) {

      const retrievedOffers = await getAllTradeOffers(signer, mktContract)
      setOffers(retrievedOffers)
      }
    })()
  }, [store])

  console.log(offers)


	return (
		<Page title='Closed Land | Collection'>
			<Container>
				<Grid container spacing={3}>
					<Grid item sm={12}>
						<Typography variant='h2' sx={{ mb: 5 }}>
							My Collection
						</Typography>

						<NFTListing listings={userItems} />
					</Grid>

					<Grid item sm={12}>
						<Typography variant='h2' sx={{ mb: 5 }}>
							My Offers
						</Typography>
              {offers && offers.map((offer, idx) => (
                <TradeOffer offer={offer} key={idx} />
              ))}

					</Grid>
				</Grid>
			</Container>
		</Page>
	);
}
