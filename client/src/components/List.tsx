'use client';

import useMetadataList from "@/hooks/useMetadataList";
import NFTCard from "./NFTCard";

export default function List() {
    const { nftMetadata } = useMetadataList();

    return (
        <div>
            <h2 className="mb-5 text-4xl font-extrabold text-slate-800">NFT List</h2>
            <div className="grid grid-cols-5 gap-5">
                {nftMetadata && nftMetadata.map((metadata, i) => (
                    <NFTCard key={i} metadata={metadata} />
                ))}
            </div>
        </div>
    )
}
