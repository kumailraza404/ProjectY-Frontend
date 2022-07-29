import React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import {
    NFT1,
    NFT2,
    NFT3,
    NFT4,
    NFT5,
    NFT6,
    NFT7,
    NFT8,
    NFT9,
    NFT10,
    NFT11,
    NFT12,
    NFT13,
    NFT14,
    NFT15,
    NFT16,
    NFT17,
    NFT18,
    NFT19,
    NFT20,
    NFT21,
    NFT22,
    NFT23,
} from "../../assets/index"

// import NFT2 from '../../assets/nft2.png'
// import NFT3 from '../../assets/dummynft2.png'

import NftCard from '../../components/nft-card'

import { Contract } from '@ethersproject/contracts'
import { ABI, Address } from '../../constants'
import { hooks } from '../../components/address-box/metaMask'

const nfts = [
  { owner: '@Johnny', bid: 0.1, name: 'CoolApe', image: NFT3 },
  { owner: '@Johnny', bid: 0.1, name: 'Dome', image: NFT2 },
  { owner: '@Johnny', bid: 0.1, name: 'CoolApe', image: NFT3 },
  { owner: '@Johnny', bid: 0.1, name: 'CoolApe', image: NFT2 },
  { owner: '@Johnny', bid: 0.1, name: 'CoolApe', image: NFT3 },
  { owner: '@Johnny', bid: 0.1, name: 'CoolApe', image: NFT2 },
]

const buttonStyleSelected = {
  background: 'linear-gradient(214.02deg, #B75CFF 6.04%, #671AE4 92.95%)',
  width: '90%',
  height: '40px',
}
const buttonStyleNotSelected = {
  background: 'rgba(255, 255, 255, 0.1)',
  width: '90%',
  height: '40px',
}

interface CollectionProps {
  setOpenPlaceBidModal(value: boolean): void
}

const Collection: React.FunctionComponent<CollectionProps> = ({
  setOpenPlaceBidModal,
}) => {
  const [selectCollection, setSelectCollection] = React.useState(0)
  const handleSelection = (index: number) => {
    setSelectCollection(index)
  }
  const [NFTCollection, setNFTCollection] = React.useState([
    { owner: '@0x001...', bid: 0.1, name: '16 Typh', image: NFT1 },
    { owner: '@0x001...', bid: 0.1, name: 'BTCK DIM', image: NFT2 },
    { owner: '@0x001...', bid: 0.1, name: 'Blacka', image: NFT3 },
    { owner: '@0x001...', bid: 0.1, name: 'Coldz', image: NFT4 },
    { owner: '@0x001...', bid: 0.1, name: 'Deathburger', image: NFT5 },
    { owner: '@0x001...', bid: 0.1, name: 'Den', image: NFT7 },
    { owner: '@0x001...', bid: 0.1, name: 'Duong Giap', image: NFT8 },
    { owner: '@0x001...', bid: 0.1, name: 'First of Chaos', image: NFT9 },
    { owner: '@0x001...', bid: 0.1, name: 'ICD', image: NFT10 },

  ]
  );
  //state nfts

  const { useProvider } = hooks
  const provider = useProvider()

  // const getAllNFTs = async () => {
  //   const protocolContract = new Contract(Address, ABI, provider?.getSigner())
  //   const nfts = await protocolContract.getNFTsOpenForSale({ gasLimit: 350000 })
  //   console.log(nfts, 'check all nfts')
  //   setNFTCollection(nfts)
  // }

  // React.useEffect(() => {
  //   getAllNFTs()
  // }, [])

  //useEffect

  return (
    <Grid container item xs={12} mt={20}>
      <Grid item xs={12} mb={5}>
        <Typography variant="h3" color="white">
          Collection
        </Typography>
        <Typography variant="h6" color="rgba(255, 255, 255, 0.5)">
          Browse our Latest Collection of Top Notch NFTs
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Button
          style={
            selectCollection === 0
              ? buttonStyleSelected
              : buttonStyleNotSelected
          }
          variant="contained"
          onClick={() => handleSelection(0)}
        >
          Art
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          style={
            selectCollection === 1
              ? buttonStyleSelected
              : buttonStyleNotSelected
          }
          variant="contained"
          onClick={() => handleSelection(1)}
        >
          Sport
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          style={
            selectCollection === 2
              ? buttonStyleSelected
              : buttonStyleNotSelected
          }
          variant="contained"
          onClick={() => handleSelection(2)}
        >
          Photography
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          style={
            selectCollection === 3
              ? buttonStyleSelected
              : buttonStyleNotSelected
          }
          variant="contained"
          onClick={() => handleSelection(3)}
        >
          Pattern
        </Button>
      </Grid>
      <Grid container item xs={12}>
        {NFTCollection.map((nft) => {
          return (
            <Grid item xs={4} mt={5}>
              <NftCard
                owner={nft.owner}
                bid={nft.bid}
                name={nft.name}
                image={nft.image}
                buttonText={'Place a bid'}
                buttonAction={() => setOpenPlaceBidModal(true)}
              />
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  )
}

export default Collection
