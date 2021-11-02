import { Router, Request, Response } from "express";

import { getEnvVariables } from "../utils/environment";
import { NEAR } from "../services/near";
import { Attendees } from "../types";
 
const router = Router();

const bagdesByWalletId = async (request: Request, response: Response) => {
  // In this object we call the NEAR 
  const near = await NEAR.getInstance();
  // // console.log('near', near);
  // // In this endpoint we call the nft_mint method of our contract for each attendee. Through a loop.
  try {
    const {
      body,
      params
    } = request as any;
    // await near.tokens_for_owner(params.walletId);
    // console.log('walletId', params.walletId);
    const query = {
      walletId: params.walletId,
  
    }

    // const tokens_for_owner = await near.tokens_for_owner(params.walletId);
    const tokens_for_owner = await near.nft_token_per_owner(params.walletId);
    // const tokens_for_owner = await near.getState()
    // console.log('tokens_for_owner', tokens_for_owner)
    // const tokens_for_owner = {}
    response.status(200).json({ success: 'OK', tokens_for_owner });
  } catch (error) {
    console.log("Error in bagdesByWalletId", error);
    response.status(500).json({ error: true, message: error });
  }
  
  
};

router.get("/badges/:walletId", bagdesByWalletId);

export default router;