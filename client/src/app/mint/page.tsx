'use client';

import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import List from '@/components/List';
import { useNft } from '@/providers/NftProvider';

export default function Mint() {
  const { isConnected } = useAccount();
  const { nftMetadata, mintedTokens, getMintedTokens } = useNft();

  useEffect(() => {
    if (isConnected) {
      getMintedTokens();
    }
  }, [isConnected, getMintedTokens]);

  return (
    <main className='container mx-auto mb-20 px-36'>
      <div>
        {isConnected && (
          <List isConnected={isConnected} nftMetadata={nftMetadata} mintedTokens={mintedTokens} />
        )}
        {!isConnected && <div>You are not login!</div>}
      </div>
    </main>
  );
}
