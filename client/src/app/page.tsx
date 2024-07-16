'use client';

import { useAccount, useAccountEffect } from 'wagmi';
import NFTCard from '../components/NFTCard';
import { Suspense, useMemo } from 'react';
import Loading from '@/app/loading';
import List from '@/components/List';
import { useNft } from '@/providers/NftProvider';
import Link from 'next/link';

export default function Home() {
  const { isConnected } = useAccount();
  const { nftMetadata, mintedTokens, filteredMetadata, handleUpdateMetadata } = useNft();

  const score = useMemo(
    () => filteredMetadata.reduce((totalScore, { score }) => totalScore + score, 0),
    [filteredMetadata]
  );

  useAccountEffect({
    onConnect({ address }) {
      handleUpdateMetadata(address as string);
    },
  });

  return (
    <main className='container mx-auto mb-20 px-36'>
      <div>
        {isConnected && (
          <div className='mb-10'>
            <Suspense fallback={<Loading />}>
              <div className='flex justify-between'>
                <h2 className='mb-5 text-4xl font-extrabold text-slate-800'>
                  My NFTs {`(Score: ${score})`}
                </h2>
                <Link
                  href='/mint'
                  className='mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm text-xl font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Mint NFTs
                </Link>
              </div>
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
                          isSmallCard={false}
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
        {!isConnected && (
          <List isConnected={isConnected} nftMetadata={nftMetadata} mintedTokens={mintedTokens} />
        )}
      </div>
    </main>
  );
}
