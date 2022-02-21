import { PersistentMap, PersistentUnorderedMap } from "near-sdk-as";
import {
  TokenId
} from "./types";

// Storage one letter key Mappings
// "m" --> token_metadata_by_id

// Storage
export const TokenMetadataById = new PersistentUnorderedMap<TokenId, TokenMetadata>("m");

@nearBindgen
export class NFTMetadata {
   spec: string; // required, essentially a version like "nft-1.0.0"
   name: string; // required, ex. "Mosaics"
   symbol: string; // required, ex. "MOSIAC"
   icon: string; // Data URL
   base_uri: string; // Centralized gateway known to have reliable access to decentralized storage assets referenced by `reference` or `media` URLs
   reference: string; // URL to a JSON file with more info
   reference_hash: u64; // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
   
   constructor(
     spec: string, name: string, symbol: string, 
     icon: string, base_uri: string, 
     reference: string, reference_hash: u64
   ) {
     this.spec = spec;
     this.name = name;
     this.symbol = symbol;
     this.icon = icon;
     this.base_uri = base_uri;
     this.reference = reference;
     this.reference_hash = reference_hash;
   }
}

@nearBindgen
export class TokenMetadata {
   title: string; // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
   description: string; // free-form description
   media: string; // URL to associated media; preferably to decentralized; content-addressed storage
   media_hash: u64; // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
   copies: u64; // number of copies of this set of metadata in existence when token was minted.
   issued_at: string; // ISO 8601 datetime when token was issued or minted
   expires_at: string; // ISO 8601 datetime when token expires
   starts_at: string; // ISO 8601 datetime when token starts being valid
   updated_at: string; // ISO 8601 datetime when token was last updated
   extra: string; // anything extra the NFT wants to store on-chain. Can be stringified JSON.
   reference: string; // URL to an off-chain JSON file with more info.
   reference_hash: u64; // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
   
   constructor(
     title: string, description: string, media: string,  
     media_hash: u64, copies: u64, issued_at: string, 
     expires_at: string, starts_at: string, updated_at: string, 
     extra: string, reference: string, reference_hash: u64
   ) {
     this.title = title;
     this.description = description;
     this.media = media;
     this.media_hash = media_hash;
     this.copies = copies;
     this.issued_at = issued_at;
     this.expires_at = expires_at;
     this.starts_at = starts_at;
     this.updated_at = updated_at;
     this.extra = extra;
     this.reference = reference;
     this.reference_hash = reference_hash;
   }
}