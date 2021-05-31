
import { storage, Context, VMContext, u128 } from "near-sdk-as";

import {
  init,
  nft_mint,
  nft_transfer,
} from "../index";

import {
  NFTMetadata,
  TokenMetadata,

} from "../metadata";

import {
  consoleLog
} from "../utils";

// const OwnerId: string = "johnq.testnet";
// In Test suite by default Context.predecessor is "carol". So lets make OwnerId the same as predecessor
const OwnerId: string = "carol";
// In Test suite by default Context.sender is "bod". So lets make SenderId the same as sender
const SenderId: string = "bob";

describe("Hello NEP171", () => {
    beforeAll(() => {
      // log("OwnerId");
      // log(OwnerId)
      // log("Context.predecessor");
      // log(Context.predecessor);
    });
    it("should init contract and set contract NFTMetadata", () => {
      // Where and What should this be?
      const reference_hash = 123213123;
      const metadata: NFTMetadata = new NFTMetadata("NFTSpec", "NFTName", "NFTSymbol", "NFTIcon", "NFTBaseURI", "NFTRef", reference_hash);
      init(OwnerId, metadata);
      const metadata_in_storage: string | null = storage.get("n", '')
      const metadata_in_storage_should_be = 
      `{\"spec\":\"NFTSpec\",\"name\":\"NFTName\",\"symbol\":\"NFTSymbol\",\"icon\":\"NFTIcon\",\"base_uri\":\"NFTBaseURI\",\"reference\":\"NFTRef\",\"reference_hash\":\"123213123\"}`
      expect(metadata_in_storage).toBe(metadata_in_storage_should_be);
    });
    
    it("should mint nft token metadata", () => {
      // Set more attachedDeposit
      const attachedDeposit = u128.from(990000);
      VMContext.setAttached_deposit(attachedDeposit);
      // Where and What should these hashes be?
      const media_hash = 123123;
      const copies = 10
      const reference_hash = 232323;
      const token_id = "SomeTokenId";
      const token_metadata: TokenMetadata = new TokenMetadata(
        "SomeNFTTitleasdasdasd", "SomeDescription", "https://i.imgur.com/ardmpqm.png", media_hash, 
        copies, "05/28/2021", "05/28/2031", "05/28/2021", 
        "what is updated_at?", "SomeNFTExtra", "SomeNFTReference", reference_hash
      );
      // log("OwnerId");
      // log(OwnerId)
      // log("Context.predecessor");
      // log(Context.predecessor);
      // log("Context.sender");
      // log(Context.sender);
      nft_mint(OwnerId, token_id, token_metadata);
    });
    
    it("should transfer nft token", () => {
      const attachedDeposit = u128.from(1);
      const receiver_id = "johnq.testnet";
      const token_id = "SomeTokenId";
      const approval_id = 0;
      const memo = "SomeMemo";
      VMContext.setAttached_deposit(attachedDeposit);
      nft_transfer(receiver_id, token_id, approval_id, memo);
    })
});