require('dotenv').config();
const fs = require("fs");
const pinataSDK = require("@pinata/sdk");

const { PINATA_API_KEY, PINATA_API_SECRET } = process.env;
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

fs.readFile('./metadataSeeds/metadata.json', 'utf8', (err, fileData) => {
    if (err) throw err;

    const { data } = JSON.parse(fileData);
    data.map(async (metadata, i) => {
        const options = {
            pinataMetadata: metadata
        };
        const res = await pinata.pinJSONToIPFS(metadata, options);
        console.log(res);
    });
});
