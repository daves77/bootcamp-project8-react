import React, { useEffect, useContext, useState } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { NFTListing } from '../sections/marketplace';
//
import PRODUCTS from '../_mocks_/products';
import { getAllMarketItems } from '../utils/contractInterface';
import { Context } from '../store';
// ----------------------------------------------------------------------

export default function Marketplace() {
	const { store, dispatch } = useContext(Context);
  const [items, setState] = useState([])
	const { marketContract, nftContract } = store;
	useEffect(() => {
		(async () => {
			if (marketContract && nftContract) {
				const marketItems = await getAllMarketItems(nftContract, marketContract);
        setState(marketItems)
			}
		})();
	}, [marketContract, nftContract]);
	return (
		<Page title='Closed Land | Marketplace'>
			<Container>
				<Typography variant='h2' sx={{ mb: 5 }}>
					Marketplace
				</Typography>

				<Stack
					direction='row'
					flexWrap='wrap-reverse'
					alignItems='center'
					justifyContent='flex-end'
					sx={{ mb: 5 }}></Stack>

				<NFTListing listings={items} />
			</Container>
		</Page>
	);
}
