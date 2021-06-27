import { VMContext, u128 } from "near-sdk-as";

import {
  nft_token,
  nft_tokens_for_owner,
} from "../lib";

import {
  test_init,
  test_nft_mint,
  test_nft_mint2,
  TokenId,
  TokenId2,
  ReceiverId,
} from "./test-change-functions";

import {
  JsonToken,
} from "../token";

import {
  TokenMetadata,
} from "../metadata";

import {
  consoleLog
} from "../utils";


export const test_nft_token = (): void => {
  // Init NFT NFTMetadata
  // test_init();
  // Mint NFT TokenMetadata
  test_nft_mint();
  const token: JsonToken | null = nft_token(TokenId);
  expect(token).not.toBe(null);
  if(token) {
    expect(token).actual
    const ownerId: string | null = token.owner_id;
    expect(ownerId).toBe("johnq.testnet");  

    const metadata: TokenMetadata | null = token.metadata;
    expect(metadata).not.toBe(null);
    if(metadata) {
      expect(metadata.title).toBe("SomeNFTTitleasdasdasd");
      expect(metadata.description).toBe("SomeDescription");
      expect(metadata.media).toBe("https://i.imgur.com/ardmpqm.png");
      expect(metadata.media_hash).toBe(123123);
      expect(metadata.copies).toBe(10);
      expect(metadata.issued_at).toBe("05/28/2021");
      expect(metadata.expires_at).toBe("05/28/2031");
      expect(metadata.starts_at).toBe("05/28/2021");
      expect(metadata.updated_at).toBe("what is updated_at?");
      expect(metadata.extra).toBe("SomeNFTExtra");
      expect(metadata.reference).toBe("SomeNFTReference");
      expect(metadata.reference_hash).toBe(232323);
    }
  }
}

export const test_nft_token2 = (): void => {
  // Init NFT NFTMetadata
  // test_init();
  // Mint NFT TokenMetadata
  test_nft_mint2();
  const token: JsonToken | null = nft_token(TokenId2);
  expect(token).not.toBe(null);
  if(token) {
    expect(token).actual
    const ownerId: string | null = token.owner_id;
    expect(ownerId).toBe("johnq.testnet");

    const metadata: TokenMetadata | null = token.metadata;
    expect(metadata).not.toBe(null);
    if(metadata) {
      expect(metadata.title).toBe("SomeNFTTitle2");
      expect(metadata.description).toBe("SomeDescription2");
      expect(metadata.media).toBe("https://i.imgur.com/uxx7BQz.jpg");
      expect(metadata.media_hash).toBe(123323);
      expect(metadata.copies).toBe(20);
      expect(metadata.issued_at).toBe("06/20/2021");
      expect(metadata.expires_at).toBe("06/20/2031");
      expect(metadata.starts_at).toBe("06/21/2021");
      expect(metadata.updated_at).toBe("what is updated_at? 2");
      expect(metadata.extra).toBe("SomeNFTExtra2");
      expect(metadata.reference).toBe("SomeNFTReference2");
      expect(metadata.reference_hash).toBe(242323);
    }
  }
  
}

export const test_nft_tokens_for_owner = (): void => {
  // Mint NFT TokenMetadata
  test_nft_mint();
  test_nft_mint2();
  const tokens_for_owner = nft_tokens_for_owner(ReceiverId);
  expect(tokens_for_owner).not.toBe(null);
  if(tokens_for_owner) {
    consoleLog("tokens_for_owner");
    consoleLog("tokens_for_owner.size.toString()");
    consoleLog(tokens_for_owner.size.toString());
    expect(tokens_for_owner.size).toBeGreaterThanOrEqual(2);
  }
}