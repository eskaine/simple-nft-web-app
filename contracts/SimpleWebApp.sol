// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleWebApp is ERC721, ERC721URIStorage, ERC721Pausable, Ownable {
    // tokens mint status
    mapping(uint256 => bool) public tokens;
    // tokens ownership
    mapping(address => uint256[]) public owners;
    uint256[] public mintedTokens;

    // required for subgraph indexing
    event Mint(address indexed _to, uint256 _tokenId, string _uri);

    constructor(address initialOwner)
        ERC721("SimpleWebApp", "SWA")
        Ownable(initialOwner)
    {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function getOwnerTokens(address owner) public view returns (uint256[] memory) {
        return owners[owner];
    }

    function getMintedTokens() public view returns (uint256[] memory) {
        return mintedTokens;
    }

    function mint(address to, uint256 tokenId, string calldata uri)
        public
        payable
    {
        require(!tokens[tokenId], "Token have been minted already");

        tokens[tokenId] = true;
        owners[to].push(tokenId);
        mintedTokens.push(tokenId);
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit Mint(to, tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
