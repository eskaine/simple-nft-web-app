import { IMetadata } from '@/app/types/metadata.type';
import { useEffect, useState } from 'react';

export default function useNftMetadata() {
    const pinataGateway = "https://gateway.pinata.cloud/ipfs/";
    const [nftMetadata, setNftMetadata] = useState<IMetadata[]>([]);

    async function getBatchData(metadataList: string[]): Promise<IMetadata[]> {
        return Promise.all(
            metadataList.map(url =>
                new Promise(async (resolve) => {
                    const cid = url.match(/^ipfs:\/\/([a-zA-Z0-9]+)$/)?.[1];
                    const res = await fetch(pinataGateway + cid);
                    const metadata: IMetadata[] = await res.json();
                    resolve(metadata);
                }
            ))
        ) as Promise<IMetadata[]>;
    }

    async function getMetadataList() {
        try {
            const url = pinataGateway + 'QmPxiyguHbuFvrpSzzoN1g4jQGyF7p788c7pdXMMUqKvU7';
            const res = await fetch(url);
            const { links: metadataList } = await res.json();
            const batchMetadata: IMetadata[] = await getBatchData(metadataList);
            setNftMetadata(batchMetadata);
        } catch (error) {
            throw new Error('Failed to fetch data');
        }
    }

    useEffect(() => {
        getMetadataList();
    }, []);

    return {
        nftMetadata,
    };
}
