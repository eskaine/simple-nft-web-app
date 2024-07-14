'use client';

import Image from 'next/image';
import { IMetadata } from '@/types/metadata.type';
import { useWriteContract, useAccount, useEstimateGas, useEstimateFeesPerGas } from 'wagmi';
import { abi } from '../../../artifacts/contracts/SimpleWebApp.sol/SimpleWebApp.json';
import { MouseEvent } from 'react';
import { contractAddress } from '@/constants';

interface Props {
  metadata: IMetadata;
  isLogin: boolean;
  callback?: Function;
  hideMintButton?: boolean;
}

export default function NFTCard({ metadata, isLogin, callback, hideMintButton = false }: Props) {
  const { address: to } = useAccount();
  const { writeContract } = useWriteContract();
  const { data } = useEstimateFeesPerGas();
  const { data: estimatedGas } = useEstimateGas({
    account: to,
    to: contractAddress,
  });
  const { id, name, description, image_url, ipfs_url } = metadata;

  function handleMint(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    writeContract(
      {
        abi,
        address: contractAddress,
        functionName: 'mint',
        value: estimatedGas,
        args: [to, id, ipfs_url],
        maxFeePerGas: data?.maxFeePerGas,
        maxPriorityFeePerGas: data?.maxPriorityFeePerGas,
      },
      {
        onSuccess: async (x) => {
          if (callback) {
            await callback(to);
          }
        },
      }
    );
  }

  return (
    <div className='max-w-[200px] justify-self-center rounded-lg border border-gray-200 bg-white text-center shadow dark:border-gray-700 dark:bg-gray-800'>
      <Image className='rounded-t-lg' src={image_url} width={200} height={200} alt={name} />
      <div
        className={`h-${callback ? 32 : 24} x-3 flex flex-col items-center justify-between py-3`}
      >
        <div className='px-2'>
          <p className='mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white'>
            {`${name} #${id}`}
          </p>
          <p className='mb-3 text-xs font-normal text-gray-700 dark:text-gray-400'>{description}</p>
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
      </div>
    </div>
  );
}
