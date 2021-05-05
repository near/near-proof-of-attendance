
import { storage, Context } from "near-sdk-as";

import {
  setGreeting,
  init,
  internal_add_token_to_owner,
} from "..";

import {
  TokensPerOwner,
  // TokensById,
  // TokenMetadataById,
  // OwnerId,
  // ExtraStorageInBytesPerToken,
  // Metadata,

} from '../model';
 // import {
 //   log,
 //
 // } from "../utils"

// Utils should be in a different folder/file. from "../utils";
declare namespace console {
  @external("console", "log")
  export function log(): void;
}


describe("Hello NEP171", () => {
    beforeEach(() => {
      init("", null)
      log("init('someArgs')");
    });
    it("should be set and read", () => {
        setGreeting("hello world");
        const greeting = storage.get<string>(Context.sender);
        expect(greeting).toBe("hello world");
        log("it works 1");
    });

    it("should set TokensPerOwner", () => {
      // Where do we find tokenId?
      const dummyAccountId = "johnq.testnet";
      const dummyTokenId = "tokenId?";
      internal_add_token_to_owner(dummyAccountId, "tokenId?");
      const value = TokensPerOwner.get(dummyAccountId);
      expect(value).toBe(dummyTokenId);
      log("it works 2");
        log("it works 2");
        TokensPerOwner.set("key", "{ value: 'someValue'}");
        const key = TokensPerOwner.get("key");
        expect(key).toBe("{ value: 'someValue'}");
    });
});
