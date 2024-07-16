'use client';

import Image from 'next/image';
import { IMetadata } from '@/types/metadata.type';
import { useWriteContract, useAccount } from 'wagmi';
import { abi } from '../abi';
import { MouseEvent } from 'react';
import { CONTRACT_ADDRESS } from '@/constants';
import { CHAINS } from '@/types/enums';

interface Props {
  metadata: IMetadata;
  isLogin: boolean;
  hideMintButton?: boolean;
  hideCard?: boolean;
  isSmallCard?: boolean;
}

export default function NFTCard({
  metadata,
  isLogin,
  hideMintButton = false,
  hideCard = false,
  isSmallCard = true,
}: Props) {
  const { address: to, chain } = useAccount();
  const { writeContract } = useWriteContract();
  const { id, ipfs_url } = metadata;

  async function handleMint(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    writeContract({
      abi,
      address: `0x${CONTRACT_ADDRESS[chain!.name]}`,
      functionName: 'mint',
      args: [to, id, ipfs_url],
    });
  }

  if (hideCard) {
    return <></>;
  }

  return (
    <div className='max-w-[200px] justify-self-center rounded-lg border border-gray-200 bg-white text-center shadow dark:border-gray-700 dark:bg-gray-800'>
      <Image
        className='rounded-t-lg'
        src={metadata.image_url}
        width={200}
        height={200}
        alt={metadata.name}
      />
      <div
        className={`${isSmallCard ? 'h-28' : 'h-[150px]'} x-3 flex flex-col items-center justify-between py-3`}
      >
        <div className='px-2'>
          <p className='mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white'>
            {`${metadata.name} #${metadata.id} `}

            <br />
            <span className='text-xs font-medium italic'>{`${metadata.attributes.join(' ')}, `}</span>
            <span className='text-xs font-bold italic text-blue-500'>{metadata.score}</span>
          </p>
          <p className='mb-3 text-xs font-normal text-gray-700 dark:text-gray-400'>
            {metadata.description}
          </p>
        </div>
        {isLogin && !hideMintButton && (
          <a
            href='#'
            className='w-20 rounded-lg bg-blue-700 px-5 py-1 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            onClick={handleMint}
          >
            Mint
          </a>
        )}
        {isLogin && metadata.chainName && (
          <div
            className={`rounded-lg ${metadata.chainName === CHAINS.SEPOLIA ? 'bg-zinc-600' : 'bg-violet-600'} px-4 py-1.5 text-center text-sm text-white`}
          >
            {metadata.chainName}
          </div>
        )}
      </div>
    </div>
  );
}
