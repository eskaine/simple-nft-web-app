import { http as https, createConfig } from 'wagmi';
import { sepolia, polygonAmoy } from 'wagmi/chains';

export const config = createConfig({
  chains: [sepolia, polygonAmoy],
  transports: {
    [sepolia.id]: https(`https://eth-sepolia.g.alchemy.com/v2/${process.env.alchemyApiKey}`),
    [polygonAmoy.id]: https(`https://polygon-amoy.g.alchemy.com/v2/${process.env.alchemyApiKey}`),
  },
  ssr: true,
});
