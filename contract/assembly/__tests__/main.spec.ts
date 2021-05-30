
import { storage, Context } from "near-sdk-as";

import {
  init,
  nft_mint,
} from "../index";

import {
  NFTMetadata,
  TokenMetadata,

} from "../metadata";

// Need to make this exported from another file ```import { console } from "../utils"
// declare namespace console {
//    @external("console", "log")
//    export function log(): void;
//  }

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
      // Where and What should these hashes be?
      const media_hash = 123123;
      const copies = 10
      const reference_hash = 232323;
      const token_metadata: TokenMetadata = new TokenMetadata(
        "SOMETokenID", "SomeNFTTitle", "https://i.imgur.com/ardmpqm.png", media_hash, 
        copies, "05/28/2021", "05/28/2031", "05/28/2021", 
        "what is updated_at?", "SomeNFTExtra", "SomeNFTReference", reference_hash
      );
      // log("OwnerId");
      // log(OwnerId)
      // log("Context.predecessor");
      // log(Context.predecessor);
      // log("Context.sender");
      // log(Context.sender);
      nft_mint(OwnerId, token_metadata);
    })
});