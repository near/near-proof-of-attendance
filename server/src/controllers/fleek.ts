import { Router, Request, Response } from "express";
import fleek from "@fleekhq/fleek-storage-js";

const router = Router();

export const upload = async (request: Request, response: Response) => {
  console.log('request.body', request.body);
  // try {
  //   const { data, filename } = request.body;
  //   const config = {
  //       apiKey: process.env.REACT_APP_FLEEK_KEY,
  //       apiSecret: process.env.REACT_APP_FLEEK_SECRET,
  //       bucket: "mrrobot16-team-bucket",
  //       key: `proof-of-attendance/${filename}`,
  //       data,
  //   }
  //   console.log('config', config);
  //   // const uploadedFile = await fleek.upload(config);
  //   const uploaded = {
  //     hash: "somehash"
  //   }
  //   console.log('uploaded', uploaded);
  //   const url = `https://ipfs.fleek.co/ipfs/${uploaded.hash}`
  //   console.log('try request.body', request.body);
  //   console.log('url', webkitURL);
  //   const json = { iwork: "YES", url }
  //   response.status(200).json(json);
  // } catch (error) {
  //   console.log("Error in upload", error);
  //   response.status(500).json({ error: true });
  // }
};

export const credentials = async (
  _: Request,
  response: Response
) => {
  try {
    console.log('try response credentials', response);
    const credentials = { 
      key: process.env.FLEEK_KEY, 
      secret: process.env.FLEEK_SECRET 
    }
    response.status(200).json(credentials);
  } catch (error) {
    console.log("Error in credentials", error);
    response.status(500).json({ error: true });
  }
};

router.get("/fleek/credentials", credentials);
router.post("/fleek/upload", upload);

export default router;


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