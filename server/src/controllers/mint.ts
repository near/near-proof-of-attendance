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

    // console.log('body', body);

    const { attendees, url, token_metadata } = body;
    // console.log('attendees, url, token_metadata', attendees, url, token_metadata);
    if(typeof attendees == "object") {
      const token_metadata = {
        "title": "SomeNFTTitle", 
        "description": "SomeNFTDesci", 
        "media": url,  
        "media_hash": "what is media_hash?", 
        "copies": attendees.length,
        "issued_at": "05/28/2021", 
        "expires_at": "05/28/2031", 
        "starts_at": "05/28/2021", 
        "updated_at": "what is updated_at?", 
        "extra": "SomeNFTExtra", 
        "reference": "SomeNFTReference", 
        "reference_hash": "SomeNFTReferenceHash" 
      }
      // console.log('attendees', attendees);
      // console.log("token_metadata", token_metadata);
      attendees.map((attendee: Attendees) => {
      // console.log("attendee", attendee)
      // loop through all attendees and mint token for each near_account address
      });

      const data = {
        attendees, 
        token_metadata
      }
      await near.mint()
      response.status(200).json({ success: 'OK', data, near });
    }

    if(typeof attendees == "string") {
      const parsedAttendees = JSON.parse(attendees);
      const token_metadata = {
        "title": "SomeNFTTitle", 
        "description": "SomeNFTDesci", 
        "media": url,  
        "media_hash": "what is media_hash?", 
        "copies": attendees.length,
        "issued_at": "05/28/2021", 
        "expires_at": "05/28/2031", 
        "starts_at": "05/28/2021", 
        "updated_at": "what is updated_at?", 
        "extra": "SomeNFTExtra", 
        "reference": "SomeNFTReference", 
        "reference_hash": "SomeNFTReferenceHash" 
      }

      const data = {
        attendees, 
        token_metadata
      }
      await near.mint()
      response.status(200).json({ success: 'OK', data, near });
    }
  } catch (error) {
    console.log("Error in mint", error);
    response.status(500).json({ error: true });
  }
};

router.post("/mint", mint);

export default router;