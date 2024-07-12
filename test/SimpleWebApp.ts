import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("SimpleWebApp", function () {
  async function deploySimpleWebAppFixture() {
    const [owner] = await hre.ethers.getSigners();

    const SimpleWebApp = await hre.ethers.getContractFactory("SimpleWebApp");
    const simpleWebApp = await SimpleWebApp.deploy(owner.address);

    return { simpleWebApp, owner };
  }

  describe("Deployment", function () {
    it("Owner should be contract owner", async function () {
      const { simpleWebApp, owner } = await loadFixture(deploySimpleWebAppFixture);
      
      expect(await simpleWebApp.owner()).to.equal(owner.address);
    });
  });

  describe("Events", function () {
    it("Should emit an event on create NFT", async function () {
      const { simpleWebApp, owner } = await loadFixture(deploySimpleWebAppFixture);
      const uri = "https://ipfs.uri";

      await expect(await simpleWebApp.createNFT(uri))
        .to.emit(simpleWebApp, "Create")
        .withArgs(1, uri);
    });
  });

  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(deployOneYearLockFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

    

    // describe("Transfers", function () {
    //   it("Should transfer the funds to the owner", async function () {
    //     const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
    //       deployOneYearLockFixture
    //     );

    //     await time.increaseTo(unlockTime);

    //     await expect(lock.withdraw()).to.changeEtherBalances(
    //       [owner, lock],
    //       [lockedAmount, -lockedAmount]
    //     );
    //   });
    // });
  // });
});
