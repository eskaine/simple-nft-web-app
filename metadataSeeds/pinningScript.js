require('dotenv').config();
const fs = require("fs");
const pinataSDK = require("@pinata/sdk");

const {PINATA_API_KEY, PINATA_API_SECRET} = process.env;
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);
const options = {
    pinataMetadata: {
        name: "metadata.json"
    }
};

const stream = fs.createReadStream("./metadataSeeds/metadata.json");
pinata.pinFileToIPFS(stream, options)
    .then(res => console.log(res));
