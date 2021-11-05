import { Router, Request, Response } from "express";
import Joi from "joi";

import { getEnvVariables } from "../utils/environment";
import { NEAR } from "../services/near";
import { AccountId, Attendee } from "../types"; 
 
const router = Router();

const mint = async (request: Request, response: Response) => {
  // In this object we call the NEAR 
  const near = await NEAR.get_instance();
  // console.log('near', near);
  // In this endpoint we call the nft_mint method of our contract for each attendee. Through a loop.
  try {
    const {
      body
    } = request as any;

    const { attendees, url, token_metadata, filename } = body;
    // console.log('attendees, url, token_metadata', 'filename', attendees, url, token_metadata, filename);
    // console.log('attendees.length', attendees.length);
    Joi.assert(url, Joi.string());
    Joi.assert(filename, Joi.string());
    // Commented this validation for now.
    // Joi.assert(token_metadata, Joi.object());
    const now = Date.now();
    
    const now_utc = new Date(now).toUTCString();
    const nft_mint = {
      owner_id: "johnq.testnet", 
      // token_metadata coming from UI.
      metadata: {
        "title": filename, 
        "description": "", 
        // "media": "https://ipfs.fleek.co/ipfs/bafybeiacydivfg63rxg7idoe6xamjcvwaf4ob47kii2sgxn5hkh2pupjga", 
        "media": url, 
        "media_hash": "", 
        "copies": "", 
        "issued_at": now_utc, 
        "expires_at": "01/01/2100",  // Should ask if POA nft are expirable
        "starts_at": now_utc, 
        "updated_at": now_utc, 
        "extra": "", 
        "reference": "", 
        "reference_hash": "" 
      }
    }
    const walletIds: AccountId[] = attendees.map((attendee: Attendee) =>{
      return attendee.walletId;
    });
    // Offchain mint_batch
    // await near.batch_mint(attendees, nft_mint.metadata);
    
    // Onchain mint_batch
    await near.mint_batch(walletIds, nft_mint.metadata);
    response.status(200).json({ success: 'OK' });
  } catch (error) {
    console.log("Error in mint", error);
    response.status(500).json({ error: true, message: error });
  }
};

router.post("/mint", mint);

export default router;