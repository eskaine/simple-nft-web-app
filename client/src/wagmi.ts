import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { localhost, sepolia, polygonAmoy } from 'wagmi/chains';
export const config = getDefaultConfig({
  appName: 'Simple Web App',
  projectId: 'simple_web_app',
  chains: [localhost, sepolia, polygonAmoy],
  transports: {
    [localhost.id]: http(),
    // [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/...'),
    // [polygon.id]: http('https://eth-sepolia.g.alchemy.com/v2/...'),
  },
  ssr: true,
});
