
import { storage, Context } from "near-sdk-as";

import {
  setGreeting,
  init,
} from "../old";

import {
  // TokensPerOwner,
  // TokensById,
  // TokenMetadataById,
  // OwnerId,
  // ExtraStorageInBytesPerToken,
  // Metadata,
  NFTMetadata,
} from '../old/model';

// Need to make this exported from another file ```import { console } from "../utils"
declare namespace console {
   @external("console", "log")
   export function log(): void;
 }

const OwnerId: string = "johnq.testnet";

describe("Hello NEP171", () => {
    beforeEach(() => {

    });
    it("should be set and read", () => {
      log("hello world");
      setGreeting("hello world");
      const greeting = storage.get<string>(Context.sender);
      expect(greeting).toBe("hello world")
    });

    it("should init contract", () => {
      log("should init contract loggg");
      const metadata: NFTMetadata = new NFTMetadata("NFTSpec", "NFTName", "NFTSymbol", "NFTIcon", "NFTBaseURI", "NFTRef", "NFTRefHash");
      init(OwnerId, metadata);
      expect(metadata.spec).toBe("NFTSpec");
    });
});
