import {useContext} from 'react'

import { Button } from '@mui/material'

import { approveTradeOffer } from "../../utils/contractInterface"
import { Context } from '../../store'

export default function TradeOffer({offer}) {
const {tradeId} = offer
  const {store} = useContext(Context)
  const {nftContract, mktContract, signer}  = store


  const handleClick = async () => {
    await approveTradeOffer(tradeId, nftContract.address, mktContract)
  }

  return (
    <Button onClick={handleClick}>Approve</Button>
  )

}