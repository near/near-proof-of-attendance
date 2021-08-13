// export const storeImageFleek = async (filename, data, setFleekUrl) => {
//   const config = {
//       apiKey: process.env.REACT_APP_FLEEK_KEY,
//       apiSecret: process.env.REACT_APP_FLEEK_SECRET,
//       bucket: "mrrobot16-team-bucket",
//       key: `proof-of-attendance/${filename}`,
//       data,
//   }
// 
//   const uploadedFile = await fleekStorage.upload(config);
//   const url = `https://ipfs.fleek.co/ipfs/${uploadedFile.hash}`
//   window.open(url);
//   setFleekUrl(url)
// }