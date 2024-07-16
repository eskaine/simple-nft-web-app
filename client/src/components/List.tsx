import { Suspense } from 'react';
import Loading from '@/app/loading';
import { IMetadata } from '@/types/metadata.type';
import NFTCard from './NFTCard';

interface Props {
  isConnected: boolean;
  nftMetadata: IMetadata[];
  mintedTokens?: Set<number>;
}

export default function List({ isConnected, nftMetadata, mintedTokens }: Props) {
  function createMintedCards() {
    return nftMetadata.map((metadata, i) => {
      const isMinted =
        Array.from(mintedTokens!).findIndex((value: number) => value == metadata.id) >= 0;

      return (
        <NFTCard
          key={i}
          metadata={metadata}
          isLogin={isConnected}
          hideMintButton={isMinted}
          hideCard={isConnected && isMinted}
          isSmallCard={isConnected ? false : true}
        />
      );
    });
  }
  return (
    <div>
      <h2 className='mb-5 text-4xl font-extrabold text-slate-800'>NFT List</h2>
      <Suspense fallback={<Loading />}>
        <div className='grid grid-cols-5 gap-5'>
          {!isConnected &&
            nftMetadata.map((metadata, i) => (
              <NFTCard key={i} metadata={metadata} isLogin={false} isSmallCard={true} />
            ))}
          {isConnected && mintedTokens && createMintedCards()}
        </div>
      </Suspense>
    </div>
  );
}
