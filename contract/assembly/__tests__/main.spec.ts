import {
  test_init,
  test_nft_mint,
  test_nft_mint2,
  test_nft_transfer,
  test_nft_mint_batch,
} from "./test-change-functions";

import {
  test_nft_token,
  test_nft_token2,
  test_nft_tokens_for_owner,
} from "./test-view-functions";

describe("Tests for NEP171 Contract", () => {
    it("should init contract and set contract NFTMetadata", test_init);
    
    it("should mint nft token metadata", test_nft_mint);
    
    it("should mint nft token metadata in batch", test_nft_mint_batch);
    
    it("should mint another nft token metadata for same above owner", test_nft_mint2);
    
    it("should init contract, mint nft token metadata & transfer nft token", test_nft_transfer);
    
    it("should return nft token by token id", test_nft_token);
    
    it("should return nft token by token id #2", test_nft_token2);
    
    it("should return nft tokens for owner by account id", test_nft_tokens_for_owner);
    
});