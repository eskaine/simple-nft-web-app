import useMetadataList from '@/hooks/useMetadataList';
import useTokensList from '@/hooks/useTokensList';
import { IMetadata } from '@/types/metadata.type';
import React, { createContext, useContext } from 'react';
import { useAccount, useWatchContractEvent } from 'wagmi';
import { abi } from '@/abi';
import { CONTRACT_ADDRESS } from '@/constants';
import { CHAINS, ContractEvents } from '@/types/enums';

interface INftContext {
  nftMetadata: IMetadata[];
  filteredMetadata: IMetadata[];
  mintedTokens: Set<number>;
  handleUpdateMetadata: (ownerAddress: string) => Promise<void>;
  getMintedTokens: () => Promise<void>;
}

const NftContext = createContext<INftContext>({
  nftMetadata: [],
  mintedTokens: new Set<number>(),
  filteredMetadata: [],
  handleUpdateMetadata: async () => {},
  getMintedTokens: async () => {},
});

export const NftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isConnected, address } = useAccount();
  const { nftMetadata, filteredMetadata, setFilteredMetadata } = useMetadataList();
  const { mintedTokens, getUserOwnedMetadatas, getMintedTokens } = useTokensList(
    nftMetadata
  );

  async function handleUpdateMetadata(address: string) {
    const userMetadatas = await getUserOwnedMetadatas(address);
    setFilteredMetadata(userMetadatas);
  }

  useWatchContractEvent({
    address: `0x${CONTRACT_ADDRESS[CHAINS.SEPOLIA]}`,
    abi,
    eventName: ContractEvents.MINT,
    onLogs() {
      if (isConnected) {
        getUserOwnedMetadatas(address as string);
        getMintedTokens();
      }
    },
  });

  useWatchContractEvent({
    address: `0x${CONTRACT_ADDRESS[CHAINS.POLYGON_AMOY]}`,
    abi,
    eventName: ContractEvents.MINT,
    onLogs() {
      if (isConnected) {
        getUserOwnedMetadatas(address as string);
        getMintedTokens();
      }
    },
  });

  return (
    <NftContext.Provider
      value={{ nftMetadata, mintedTokens, filteredMetadata, handleUpdateMetadata, getMintedTokens }}
    >
      {children}
    </NftContext.Provider>
  );
};

export const useNft = () => {
  return useContext(NftContext);
};
