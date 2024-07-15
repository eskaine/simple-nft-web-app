import { contractAddress } from '@/constants';
import { abi } from '../../../artifacts/contracts/SimpleWebApp.sol/SimpleWebApp.json';
import { useCallback, useEffect, useState } from 'react';
import { ContractGetFunction } from '@/types/abi.type';
import { readContract } from '@wagmi/core';
import { config } from '@/wagmi';
import { IMetadata } from '@/types/metadata.type';

export default function useTokensList(nftMetadata: IMetadata[], filterCallback: Function) {
  const [mintedTokens, setMintedTokens] = useState<number[]>([]);

  async function getUserOwnedTokens(ownerAddress: string) {
    // fetch user owned tokens
    const ownerTokens = await readContract(config, {
      abi,
      address: contractAddress,
      functionName: ContractGetFunction.GET_OWNER_TOKENS,
      args: [ownerAddress],
    });

    //filtered metadata
    const filteredMetadata = nftMetadata.filter(
      (metadata) => (ownerTokens as number[]).findIndex((id) => id == metadata.id) >= 0
    );

    // set data
    filterCallback(filteredMetadata);
  }

  const getMintedTokens = useCallback(async () => {
    const result = await readContract(config, {
      abi,
      address: contractAddress,
      functionName: ContractGetFunction.GET_MINTED_TOKENS,
    });

    setMintedTokens(result as number[]);
  }, []);

  async function onMintCallback(ownerAddress: string) {
    await getUserOwnedTokens(ownerAddress);
    await getMintedTokens();
  }

  useEffect(() => {
    getMintedTokens();
  }, [getMintedTokens]);

  return {
    mintedTokens,
    getUserOwnedTokens,
    getMintedTokens,
    onMintCallback,
  };
}
