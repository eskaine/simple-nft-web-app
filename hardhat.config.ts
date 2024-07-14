import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "@nomiclabs/hardhat-solhint";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      chainId: 1337
    },
  },
};

export default config;
