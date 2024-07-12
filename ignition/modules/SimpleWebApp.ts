import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SimpleWebAppModule", (m) => {
  const owner = m.getAccount(0);
  const simpleWebApp = m.contract("SimpleWebApp", [owner]);

  return { simpleWebApp };
});
