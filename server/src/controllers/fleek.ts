import { Router, Request, Response } from "express";
import fleek from "@fleekhq/fleek-storage-js";
import multer from "multer";
import { readFile } from "node:fs"

import { getEnvVariables } from "../utils/environment";

const router = Router();
const upload_multer = multer({ storage: multer.memoryStorage() })

const { FLEEK_KEY, FLEEK_SECRET } = getEnvVariables();

export const upload = async (request: Request, response: Response) => {
  try {
    const { 
      files, 
      body: { filename } 
    } = request as any

    const { buffer: data } = files[0];

    const config = {
        apiKey: FLEEK_KEY,
        apiSecret: FLEEK_SECRET,
        bucket: "mrrobot16-team-bucket",
        key: `proof-of-attendance/${filename}`,
        data
    }
    
    const uploaded = await fleek.upload(config as any);
    const url = `https://ipfs.fleek.co/ipfs/${uploaded.hash}`

    response.status(200).json({ success: 'OK', url });
  } catch (error) {
    console.log("Error in upload", error);
    response.status(500).json({ error: true, message: error });
  }
};

router.post("/fleek/upload", upload_multer.any(), upload);

export default router;