import axios from 'axios';
/* 
  pinFile() refs
  a. https://docs.pinata.cloud/api-pinning/pin-file 
  b. https://github.com/komus-Israel/how-to-pin-files-to-pinata-in-react/blob/main/src/App.js
  */
const headers = {
	pinata_api_key: process.env.REACT_APP_PINATA_KEY,
	pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET,
};

export const pinFile = async (file, metadata) => {
	const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
	const data = new FormData();
	data.append('file', file);
	const stringifiedMetadata = JSON.stringify({
		keyvalues: metadata,
	});
	data.append('pinataMetadata', stringifiedMetadata);
  console.log(metadata)
	const result = await axios.post(url, data, {
		maxBodyLength: 'Infinity',
		headers,
	});
	return result.data.IpfsHash;
};

export const getAllNFT = async () => {
  const nftMetadata = await axios.get("https://api.pinata.cloud/data/pinList?status=pinned", headers)
  return nftMetadata
};
