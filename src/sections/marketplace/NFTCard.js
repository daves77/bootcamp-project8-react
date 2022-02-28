/* react imports */
import { Link as RouterLink } from 'react-router-dom';
/* proptype verification imports */
import PropTypes from 'prop-types';
/* mui imports */
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { Context } from "../../store";
import { useState, useRef, useContext } from "react";
import { styled } from '@mui/material/styles';
import { createMarketItemSale } from '../../utils/contractInterface';
// utils
//
import Iconify from '../../components/Iconify';
import { ethers, BigNumber } from 'ethers';
// ----------------------------------------------------------------------

const NFTImageStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

NFTCard.propTypes = {
  listing: PropTypes.object
};

export default function NFTCard({ listing }) {
  const { itemId, tokenId, price, image, seller, owner, sold, oriPrice } = listing
  const { store } = useContext(Context);
  const { user, nftContract, mktContract } = store;
  console.log('nftcontract', nftContract)

  const buyToken = async () => {
    console.log('this runs FE1')
    console.log('type price', typeof price)
    const transaction = await createMarketItemSale(nftContract.address, mktContract, itemId, price, oriPrice);

    console.log('txn', transaction)
    await transaction.wait();
    console.log('this runs FE2')
  }

  return (
    <Card>
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
        <NFTImageStyle alt={"test"} src={`https://gateway.pinata.cloud/ipfs/${image}`} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {seller}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
            </Typography>
            <Iconify icon={'cib:ethereum'} sx={{ width: 14, height: 14 }} />
            &nbsp;
            {price}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
            </Typography>

            &nbsp;

            TokenID: {tokenId}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
            </Typography>

            &nbsp;
            <Button variant="contained" value={price, tokenId, seller} disabled={user.userAddress === seller || sold === true ? true : false} onClick={() => { console.log('click') }}>Bid</Button>
            <Button variant="contained" value={tokenId, seller, price} disabled={user.userAddress === seller || sold === true ? true : false} onClick={buyToken}>Buy</Button>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
