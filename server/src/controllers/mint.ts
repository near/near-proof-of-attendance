import { Router, Request, Response } from "express";
import {  } from "near-api-js"
 
const router = Router();

const mint = async (request: Request, response: Response) => {
  try {
    const { 
      body
    } = request as any
    console.log('body', body);
    const mint = { 
      mint_property: 'some_mint_property' 
    }
    
    // In this endpoint we call the nft_mint method of our contract for each attendee. Through a loop.
    
    response.status(200).json({ success: 'OK', mint });
  } catch (error) {
    console.log("Error in mint", error);
    response.status(500).json({ error: true });
  }
};

router.post("/mint", mint);

export default router;