'use client';

import { useAccount, useAccountEffect } from 'wagmi';
import useMetadataList from '@/hooks/useMetadataList';
import useTokensList from '@/hooks/useTokensList';
import NFTCard from './NFTCard';

export default function List() {
  const { isConnected } = useAccount();
  const { ownerTokens, mintedTokens, getUserOwnedTokens, onMintCallback } = useTokensList();
  const { nftMetadata } = useMetadataList();

  function filteredCards() {
    return nftMetadata
      .filter((metadata) => ownerTokens.findIndex((id) => id == metadata.id) >= 0)
      .map((metadata, i) => (
        <NFTCard key={i} metadata={metadata} isLogin={isConnected} hideMintButton={true} />
      ));
  }

  function setMintedCards() {
    return nftMetadata.map((metadata, i) => {
      const isMinted = mintedTokens.findIndex((value: number) => value == metadata.id) >= 0;
      return (
        <NFTCard
          key={i}
          metadata={metadata}
          isLogin={isConnected}
          hideMintButton={isMinted}
          callback={onMintCallback}
        />
      );
    });
  }

  useAccountEffect({
    onConnect({ address }) {
      getUserOwnedTokens(address as string);
    },
  });

  return (
    <div>
      {isConnected && (
        <div className='mb-10'>
          <h2 className='mb-5 text-4xl font-extrabold text-slate-800'>My NFTs</h2>
          {ownerTokens.length > 0 && (
            <div className='grid gap-5 sm:grid-cols-4 md:grid-cols-5'>
              {nftMetadata && filteredCards()}
            </div>
          )}

          {!ownerTokens.length && <div className='mb-10 text-lg'>You do not own any NFTs.</div>}
        </div>
      )}
      <div>
        <h2 className='mb-5 text-4xl font-extrabold text-slate-800'>NFT List</h2>
        <div className='grid grid-cols-5 gap-5'>
          {nftMetadata && mintedTokens && setMintedCards()}
        </div>
      </div>
    </div>
  );
}
