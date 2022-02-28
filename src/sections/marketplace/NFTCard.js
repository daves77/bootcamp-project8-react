/* react imports */
import { useContext, useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom';
/* proptype verification imports */
import PropTypes from 'prop-types';
/* mui imports */
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
// utils
//
import Iconify from '../../components/Iconify';
import { buyMarketItem } from '../../utils/contractInterface';
import { Context } from '../../store'
// ----------------------------------------------------------------------

const NFTImageStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

// ----------------------------------------------------------------------

NFTCard.propTypes = {
  listing: PropTypes.object
};

export default function NFTCard({ listing }) {
  const navigate = useNavigate();
  const { store, dispatch } = useContext(Context)
  const { itemId, tokenId, price, image, seller, priceEth, status } = listing
  const { user } = store
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    await buyMarketItem(store.nftContract.address, store.mktContract, itemId, priceEth)
    setInterval(() => {
      setLoading(false);
      navigate("/user");
    }, 10000);
    clearInterval(setInterval);
  }

  return (
    <div className="sweet-loading">
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
            <Button onClick={handlePurchase} disabled={user.userAddress === seller || status === "sold" ? true : false}>Buy</Button>
          </Stack>
        </Stack>
      </Card>
      <ClipLoader color={"blue"} loading={loading} css={override} size={150} />
    </div>
  );
}
