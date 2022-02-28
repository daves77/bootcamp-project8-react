import { useContext, useEffect, useState } from 'react';

import { Grid , Button} from '@mui/material';

import Page from '../components/Page';
import { Context } from '../store';

import NFTListing from '../sections/trades/NFTListings';
import { sendTradeOffer } from '../utils/contractInterface';

export default function Trade() {
	const [userItems, setUserItems] = useState([]);
	const [availableItems, setAvailableItems] = useState([]);
  const [trade,setTrade] = useState({user:[], selected:[] })
  const [offereeAddress, setOffereeAddress]= useState("")
	const { store } = useContext(Context);
	const { items, signer, mktContract  } = store;

	useEffect(() => {
		(async () => {
			if (items) {
				const sortedItems = items.reduce(
					(prev, item) => {
						if (item.owner === signer) {
							prev.user.push(item);
						} else if (item.owner !== signer) {
							prev.market.push(item);
						}
            return prev
					},
					{ user: [], market: [] }
				);

				setUserItems(sortedItems.user);
				setAvailableItems(sortedItems.market);
			}
		})();
	}, [store]);

  console.log(trade)

  const handleClick =  async () => {
    await sendTradeOffer(trade.user, trade.selected, offereeAddress, mktContract)
  }

	return (
		<Page title='Closed Land | Trade'>
			{items.length > 0 && (
				<div>
					<Grid container maxWidth='xl'>
						<Grid item md={5}>
							<NFTListing listings={userItems} trade={trade} setTrade={setTrade} />
						</Grid>
            
						<Grid item md={2}>
              <Button onClick={handleClick}>Swap</Button>
						</Grid>

						<Grid item md={5}>
							<NFTListing listings={availableItems}  trade={trade} setTrade={setTrade} setOffereeAddress={setOffereeAddress}/>
						</Grid>
					</Grid>
				</div>
			)}
		</Page>
	);
}
