import { useCallback, useEffect, useState } from 'react';
import { readContract } from '@wagmi/core';
import { config } from '@/wagmi';
import { CHAINS, ContractGetFunction } from '@/types/enums';
import { IMetadata } from '@/types/metadata.type';
import { CONTRACT_ADDRESS } from '@/constants';
import { abi } from '../abi';
import { polygonAmoy, sepolia } from 'viem/chains';

interface ChainParam {
  functionName: string;
  args?: Array<any>;
}

export default function useTokensList(nftMetadata: IMetadata[], filterCallback: Function) {
  const [mintedTokens, setMintedTokens] = useState<Set<number>>(new Set());

  function updateTokens(id: number) {
    const updatedTokens = [...Array.from(mintedTokens), id];
    setMintedTokens(new Set(updatedTokens));
  }

  async function fetchMultiChainData<DataResponse>(params: ChainParam): Promise<DataResponse> {
    return Promise.all([
      // fetch data from sepolia
      readContract(config, {
        ...params,
        abi,
        address: `0x${CONTRACT_ADDRESS[CHAINS.SEPOLIA]}`,
        chainId: sepolia.id,
      }),
      // fetch data from polygon amoy
      readContract(config, {
        ...params,
        abi,
        address: `0x${CONTRACT_ADDRESS[CHAINS.POLYGON_AMOY]}`,
        chainId: polygonAmoy.id,
      }),
    ]) as DataResponse;
  }

  async function getUserOwnedTokens(ownerAddress: string, chainName: string) {
    // fetch user owned tokens
    const results = await fetchMultiChainData<Array<number[]>>({
      functionName: ContractGetFunction.GET_OWNER_TOKENS,
      args: [ownerAddress],
    });

    // filter user owned metadata
    const filteredMetadata = nftMetadata.reduce((resultArr, metadata) => {
      const sepoliaIndex = results[0].findIndex((id) => id == metadata.id);
      const polygonAmoyIndex = results[1].findIndex((id) => id == metadata.id);

      let updatedMetadata = { ...metadata };

      if (sepoliaIndex >= 0) {
        updatedMetadata.chainName = CHAINS.SEPOLIA;
      }

      if (polygonAmoyIndex >= 0) {
        updatedMetadata.chainName = CHAINS.POLYGON_AMOY;
      }

      if (sepoliaIndex >= 0 || polygonAmoyIndex >= 0) {
        return [...resultArr, updatedMetadata];
      }

      return resultArr;
    }, [] as IMetadata[]);

    // set data
    filterCallback(filteredMetadata);
  }

  const getMintedTokens = useCallback(async () => {
    // fetch minted tokens
    const results = await fetchMultiChainData<Array<number[]>>({
      functionName: ContractGetFunction.GET_MINTED_TOKENS,
    });

    // merge both data into a set
    setMintedTokens(new Set([...results[0], ...results[1]]));
  }, []);

  useEffect(() => {
    getMintedTokens();
  }, [getMintedTokens]);

  return {
    mintedTokens,
    getUserOwnedTokens,
    getMintedTokens,
    updateTokens,
  };
}
