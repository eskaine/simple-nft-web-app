import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className='border-gray-200 bg-white dark:bg-gray-900'>
      <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
        <div className='flex items-center space-x-3 rtl:space-x-reverse'>
          <Image
            src='https://flowbite.com/docs/images/logo.svg'
            className='h-8'
            width={20}
            height={20}
            alt='Flowbite Logo'
          />
          <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>
            Simple Web App
          </span>
        </div>
        <ConnectButton />
      </div>
    </nav>
  );
}
