'use client';

import { useAccount, useAccountEffect } from 'wagmi';
import useMetadataList from '@/hooks/useMetadataList';
import useTokensList from '@/hooks/useTokensList';
import NFTCard from './NFTCard';
import { Suspense } from 'react';
import Loading from '@/app/loading';

export default function List() {
  const { isConnected } = useAccount();
  const { nftMetadata, filteredMetadata, updateFilteredMetadata } = useMetadataList();
  const { mintedTokens, getUserOwnedTokens, onMintCallback } = useTokensList(
    nftMetadata,
    updateFilteredMetadata
  );

  function generateScore() {
    return filteredMetadata.reduce((totalScore, { score }) => totalScore + score, 0);
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
          <h2 className='mb-5 text-4xl font-extrabold text-slate-800'>
            My NFTs {`(Score: ${generateScore()})`}
          </h2>

          <Suspense fallback={<Loading />}>
            {filteredMetadata.length > 0 && (
              <div className='grid gap-5 sm:grid-cols-4 md:grid-cols-5'>
                {nftMetadata &&
                  filteredMetadata.map((metadata, i) => {
                    return (
                      <NFTCard
                        key={i}
                        metadata={metadata}
                        isLogin={isConnected}
                        hideMintButton={true}
                      />
                    );
                  })}
              </div>
            )}

            {!filteredMetadata.length && (
              <div className='mb-10 text-lg'>You do not own any NFTs.</div>
            )}
          </Suspense>
        </div>
      )}
      <div>
        <h2 className='mb-5 text-4xl font-extrabold text-slate-800'>NFT List</h2>
        <Suspense fallback={<Loading />}>
          <div className='grid grid-cols-5 gap-5'>
            {nftMetadata && mintedTokens && setMintedCards()}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
