import { Router, Request, Response } from "express";

import { getEnvVariables } from "../utils/environment";
import { NEAR } from "../services/near";
import { Attendees } from "../types";
 
const router = Router();

const mint = async (request: Request, response: Response) => {
  // In this object we call the NEAR 
  const near = await NEAR.getInstance();
  // console.log('near', near);
  // In this endpoint we call the nft_mint method of our contract for each attendee. Through a loop.
  try {
    const {
      body
    } = request as any;

    const { attendees, url, token_metadata, filename } = body;
    console.log('attendees, url, token_metadata', attendees, url, token_metadata);
    const now = Date.now();
    const now_utc = new Date(now).toUTCString();
    const nft_mint = {
      owner_id: "johnq.testnet", 
      metadata: {
        "title": filename, 
        "description": "", 
        // "media": "https://ipfs.fleek.co/ipfs/bafybeiacydivfg63rxg7idoe6xamjcvwaf4ob47kii2sgxn5hkh2pupjga", 
        "media": url, 
        "media_hash": "", 
        "copies": "3", 
        "issued_at": now_utc, 
        "expires_at": "05/28/2031",  // Should ask if POA nft are expirable
        "starts_at": now_utc, 
        "updated_at": now_utc, 
        "extra": "", 
        "reference": "", 
        "reference_hash": "" 
      }
    }
    console.log('nft_mint', nft_mint);
    await near.batchMint(attendees, nft_mint.metadata);
    response.status(200).json({ success: 'OK' });
  } catch (error) {
    console.log("Error in mint", error);
    response.status(500).json({ error: true });
  }
};

router.post("/mint", mint);

export default router;