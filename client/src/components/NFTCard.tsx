import Image from 'next/image';
import { IMetadata } from '@/app/types/metadata.type';

interface Props {
  metadata: IMetadata;
  isLogin?: boolean;
}

export default function NFTCard({ metadata, isLogin = false }: Props) {
  const { name, description, image_url } = metadata;

  return (
    <div className='max-w-[200px] justify-self-center rounded-lg border border-gray-200 bg-white text-center shadow dark:border-gray-700 dark:bg-gray-800'>
      <Image className='rounded-t-lg' src={image_url} width={200} height={200} alt={name} />
      <div className='px-3 py-2'>
        <a href='#'>
          <p className='text-md mb-2 font-bold tracking-tight text-gray-900 dark:text-white'>
            {name}
          </p>
        </a>
        <p className='mb-3 text-sm font-normal text-gray-700 dark:text-gray-400'>{description}</p>
        {isLogin && (
          <a
            href='#'
            className='inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Mint
          </a>
        )}
      </div>
    </div>
  );
}
