/* react imports */
import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
/* proptype verification imports */
import PropTypes from 'prop-types';
/* mui imports */
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
//
import Iconify from '../../components/Iconify';
import { buyMarketItem } from '../../utils/contractInterface';
import { Context } from '../../store';
// ----------------------------------------------------------------------

const NFTImageStyle = styled('img')({
	top: 0,
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	position: 'absolute',
});

// ----------------------------------------------------------------------

NFTCard.propTypes = {
	listing: PropTypes.object,
};

export default function NFTCard({ listing, trade, setTrade, setOffereeAddress }) {
	const { store, dispatch } = useContext(Context);
	const { signer } = store;
	const { itemId, tokenId, price, image, owner, priceEth } = listing;

	const handleClick = () => {
    console.log(signer, owner)
		if (signer === owner) {
      let selectedItems = [...trade.user]    
			if (trade.user.includes(itemId)) {
				const index = trade.user.indexOf(itemId);
        selectedItems.splice(index)
			} else {
        selectedItems.push(itemId)
      }
			setTrade({ ...trade , user: selectedItems});
		} else {
      let selectedItems = [...trade.selected]    
			if (trade.selected.includes(itemId)) {
				const index = trade.user.indexOf(itemId);
        selectedItems.splice(index)
			} else {
        selectedItems.push(itemId)
      }
			setTrade({ ...trade , selected: selectedItems});

      //fix this
      if (selectedItems.length === 0){
        setOffereeAddress("")
      } else {
        setOffereeAddress(owner)
      }
    }
	};

	return (
		<Card onClick={handleClick}>
			<Box sx={{ pt: '100%', position: 'relative' }}>
				{/* {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )} */}
				<NFTImageStyle
					alt={'test'}
					src={`https://gateway.pinata.cloud/ipfs/${image}`}
				/>
			</Box>

			<Stack spacing={2} sx={{ p: 3 }}>
				<Link to='#' color='inherit' underline='hover' component={RouterLink}>
					<Typography variant='subtitle2' noWrap>
						{owner}
					</Typography>
				</Link>

				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'>
					<Typography
						variant='subtitle1'
						sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography
							component='span'
							variant='body1'
							sx={{
								color: 'text.disabled',
								textDecoration: 'line-through',
							}}></Typography>
						<Iconify icon={'cib:ethereum'} sx={{ width: 14, height: 14 }} />
						&nbsp;
						{price}
					</Typography>
				</Stack>
			</Stack>
		</Card>
	);
}
