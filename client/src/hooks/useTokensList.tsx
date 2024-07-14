import { contractAddress } from '@/constants';
import { abi } from '../../../artifacts/contracts/SimpleWebApp.sol/SimpleWebApp.json';
import { useCallback, useEffect, useState } from 'react';
import { ContractGetFunction } from '@/types/abi.type';
import { readContract } from '@wagmi/core';
import { config } from '@/wagmi';

export default function useTokensList() {
  const [ownerTokens, setOwnerTokens] = useState<number[]>([]);
  const [mintedTokens, setMintedTokens] = useState<number[]>([]);

  async function getUserOwnedTokens(ownerAddress: string) {
    const result = await readContract(config, {
      abi,
      address: contractAddress,
      functionName: ContractGetFunction.GET_OWNER_TOKENS,
      args: [ownerAddress],
    });
    setOwnerTokens(result as number[]);
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
    ownerTokens,
    mintedTokens,
    getUserOwnedTokens,
    getMintedTokens,
    onMintCallback,
  };
}
