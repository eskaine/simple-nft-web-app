import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SimpleWebApp", function () {
  async function deploySimpleWebAppFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const SimpleWebApp = await ethers.getContractFactory("SimpleWebApp");
    const simpleWebApp = await SimpleWebApp.deploy(owner.address);

    return { simpleWebApp, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Owner should be contract owner", async function () {
      const { simpleWebApp, owner } = await loadFixture(deploySimpleWebAppFixture);

      expect(await simpleWebApp.owner()).to.equal(owner.address);
    });
  });

  describe("Minting", function () {
    it("Should be successfully minted", async function () {
      const { simpleWebApp, owner, otherAccount } = await loadFixture(deploySimpleWebAppFixture);
      const uri = "https://ipfs.uri";
      const tokenId = 3;

      await expect(await simpleWebApp.tokens(tokenId)).to.equal(false);

      await simpleWebApp.connect(owner).mint(otherAccount, tokenId, uri);

      await expect(await simpleWebApp.tokens(tokenId)).to.equal(true);
    });

    it("Minter should received token", async function () {
      const { simpleWebApp, owner, otherAccount } = await loadFixture(deploySimpleWebAppFixture);
      const uri = "https://ipfs.uri";
      const tokenId = 3;

      await simpleWebApp.connect(owner).mint(otherAccount, tokenId, uri);
      const tokens = await simpleWebApp.getOwnerTokens(otherAccount.address);

      await expect(tokens[0]).to.equal(tokenId);
    });

    it("Token cannot be minted repeatedly.", async function () {
      const { simpleWebApp, owner, otherAccount } = await loadFixture(deploySimpleWebAppFixture);
      const uri = "https://ipfs.uri";
      const tokenId = 3;

      await simpleWebApp.connect(owner).mint(otherAccount, tokenId, uri);

      await expect(simpleWebApp.connect(owner).mint(otherAccount, tokenId, uri))
        .to.be.revertedWith("Token have been minted already");
    });
  });

  describe("Events", function () {
    it("Should emit an event on create NFT", async function () {
      const { simpleWebApp, owner, otherAccount } = await loadFixture(deploySimpleWebAppFixture);
      const uri = "https://ipfs.uri";
      const tokenId = 3;

      await expect(await simpleWebApp.connect(owner).mint(otherAccount, tokenId, uri))
        .to.emit(simpleWebApp, "Mint")
        .withArgs(otherAccount, tokenId, uri);
    });
  });
});
