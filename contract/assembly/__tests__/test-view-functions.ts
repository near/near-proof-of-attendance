import {
  test_init,
  test_nft_mint,
} from "./test-change-functions";

import {
  consoleLog
} from "../utils";


export const test_nft_token = (): void => {
  // Init NFT NFTMetadata
  test_init();  
  // Mint NFT TokenMetadata
  test_nft_mint();
  // return "return nft_token(token_id: TokenId): JsonToken | null"
}

export const test_nft_tokens_for_owner = (): void => {
  // Init NFT NFTMetadata
  test_init();  
  // Mint NFT TokenMetadata
  test_nft_mint();
  // return "internal_nft_tokens_for_owner(account_id: string, from_index: string, limit: number): Token[]"
}