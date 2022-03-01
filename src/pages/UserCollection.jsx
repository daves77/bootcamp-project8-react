import React, { useEffect, useState, useContext } from 'react';
// material
import { Container, Stack, Typography, Grid } from '@mui/material';
// components
import Page from '../components/Page';
import { NFTListing } from '../sections/marketplace';
import TradeOffer from '../sections/user/TradeOffer';
//
import { getAllTradeOffers } from '../utils/contractInterface';
import { Context } from '../store';
// ----------------------------------------------------------------------

export default function UserCollection() {
	const [offers, setOffers] = useState([]);
	const { store } = useContext(Context);
	const { items, signer, mktContract } = store;

	useEffect(() => {
		(async () => {
			if (mktContract) {
				const retrievedOffers = await getAllTradeOffers(signer, mktContract);
				setOffers(retrievedOffers);
			}
		})();
	}, [store]);

	console.log(offers);

	const userItems = items.filter((item) => item.owner === signer);
  console.log(userItems, "userItems")
	const inactiveItems = userItems.filter((item) => item.status !== 'available');
	const activeItems = userItems.filter((item) => item.status === 'available');

	return (
		<Page title='Closed Land | Collection'>
			<Container>
				<Grid container spacing={3}>
          			<Typography variant='h2' sx={{ mb: 5 }}>
							Active Listings
						</Typography>
						<NFTListing listings={activeItems} sx={{mb: 2}} />

          			<Typography variant='h2' sx={{ mb: 5 }}>
							Inactive Listings
						</Typography>
						<NFTListing listings={inactiveItems} />

					<Grid item sm={12}>
						<Typography variant='h2' sx={{ mb: 5 }}>
							My Offers
						</Typography>
						{offers &&
							offers.map((offer, idx) => (
								<TradeOffer offer={offer} key={idx} />
							))}
					</Grid>
				</Grid>
			</Container>
		</Page>
	);
}
