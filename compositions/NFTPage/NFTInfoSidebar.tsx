import { Heading, Stack, Flex, Paragraph, Box, BoxProps } from '@zoralabs/zord'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { FillV3AskInfo } from '@market'
import { useNFTProvider, useIsOwner, useTitleWithFallback } from '@shared'
import { Link } from 'components'
import { clickAnimation } from 'styles/styles.css'
import { nftInfoSidebar, nftInfoSidebarWrapper, askInfoWrapper } from './NFTPage.css'
import { MarketUi } from './MarketUi'
import { useNounishAuctionProvider } from '@noun-auction'

import { lightFont } from '@shared'

export interface NFTInfoSidebar extends BoxProps {}

export function NFTInfoSidebar({ ...props }: NFTInfoSidebar) {
  const { initialData: nft, tokenId, contractAddress } = useNFTProvider()

  if (!nft || !tokenId || !contractAddress) return null

  const { isOwner } = useIsOwner(nft)
  const { fallbackTitle } = useTitleWithFallback(
    contractAddress,
    tokenId,
    nft?.metadata?.name
  )
  const { isComplete, activeAuctionId } = useNounishAuctionProvider()

  return (
    <Box id="nft-info-sidebar" className={nftInfoSidebar} {...props}>
      <Stack className={nftInfoSidebarWrapper}>
        <Flex>
          <Link href={`/collections/${nft?.nft?.contract.address}`}>
            <CollectionThumbnail
              collectionAddress={nft?.nft?.contract.address}
              useTitle
              size="xxs"
              radius="round"
              p="x2"
              pr="x5"
              backgroundColor="tertiary"
              borderRadius="round"
              className={clickAnimation}
            />
          </Link>
        </Flex>
        <Heading as="h1" size="xl">
          {fallbackTitle}
        </Heading>
        {nft?.metadata?.description && (
          <Paragraph size="lg" className={lightFont}>
            {nft?.metadata?.description}
          </Paragraph>
        )}
        {!isOwner && isComplete && (
          <Stack className={askInfoWrapper}>
            <FillV3AskInfo showBalance={false} nft={nft} />
          </Stack>
        )}
        {nft?.nft && (
          <MarketUi
            contractAddress={nft.nft.contract.address}
            tokenId={nft.nft.tokenId}
            nft={nft}
          />
        )}
      </Stack>
    </Box>
  )
}
