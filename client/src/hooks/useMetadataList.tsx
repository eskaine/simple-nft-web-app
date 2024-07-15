import { METADATA_GROUP_ID } from '@/constants';
import { IMetadata } from '@/types/metadata.type';
import { PinataResponse } from '@/types/pinataResponse.type';
import { useCallback, useEffect, useState } from 'react';

export default function useNftMetadata() {
  const pinataGateway = 'https://gateway.pinata.cloud/ipfs/';
  const pinataApi = 'https://api.pinata.cloud/data/pinList';
  const [nftMetadata, setNftMetadata] = useState<IMetadata[]>([]);
  const [filteredMetadata, setFilteredMetadata] = useState<IMetadata[]>([]);

  function updateFilteredMetadata(nftMetadata: IMetadata[]) {
    setFilteredMetadata(nftMetadata);
  }

  async function getBatchData(metadataList: PinataResponse[]): Promise<IMetadata[]> {
    return Promise.all(
      metadataList.map(
        (file) =>
          new Promise(async (resolve) => {
            const res = await fetch(pinataGateway + file.ipfs_pin_hash);
            let metadata: IMetadata = await res.json();
            metadata.ipfs_url = `ipfs://${file.ipfs_pin_hash}`;

            resolve(metadata);
          })
      )
    ) as Promise<IMetadata[]>;
  }

  const getMetadataList = useCallback(async () => {
    try {
      const pageLimit = 20;
      const queryFilters = `?groupId=${METADATA_GROUP_ID}&pageLimit=${pageLimit}`;

      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.pinataJwt}`,
        },
      };

      // get a list of available nft metadata cid
      const res = await fetch(pinataApi + queryFilters, options);
      const { rows: metadataList } = await res.json();

      // get metadata json with cid
      let batchMetadata: IMetadata[] = await getBatchData(metadataList);
      setNftMetadata(batchMetadata);
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  }, []);

  useEffect(() => {
    getMetadataList();
  }, [getMetadataList]);

  return {
    nftMetadata,
    filteredMetadata,
    updateFilteredMetadata,
  };
}
