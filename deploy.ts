/// This file is use to copy and past commands in terminal.

const init = `
near call dev-1620252450193-6591749 init '{ "owner_id": "johnq.testnet", "metadata": { "spec": "SomeSpec", "name": "SomeName", "symbol":"SomeSymbol", "icon": "SomeIcon", "base_uri": "SomeBaseUri", "reference": "SomeReference", "reference_hash": "SomeReferenceHash" } }' --accountId=johnq.testnet
`

const init = `
near call dev-1620252450193-6591749 init '{ "owner_id": "johnq.testnet" }' --accountId=johnq.testnet
`


const initMetadata = {
  "owner_id": "johnq.testnet", 
  "metadata": { 
    "spec":"SomeSpec", 
    "name": "SomeName", 
    "symbol":"SomeSymbol",
    "icon": "SomeIcon",
    "base_uri": "SomeBaseUri",
    "reference": "SomeReference",
    "reference_hash": "SomeReferenceHash"
  } 
}

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
     title: string, description: string, media: string,  media_hash: string, copies: u64, issued_at: string, 
     expires_at: string, starts_at: string, updated_at: string, extra: string, reference: string, reference_hash: u64) {
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

const nft_mint = `near call dev-1620252450193-6591749 nft_mint '{ "token_id": "SOENTTOKEN2", "metadata": { "title": "SomeNFTTitle", "description": "SomeNFTDesci", "media": "https://i.imgur.com/ardmpqm.png",  "media_hash": "what is media_hash?", "copies": "3", "issued_at": "05/28/2021", "expires_at": "05/28/2031", "starts_at": "05/28/2021", "updated_at": "what is updated_at?", "extra": "SomeNFTExtra", "reference": "SomeNFTReference", "reference_hash": "SomeNFTReferenceHash" } }' --accountId=johnq.testnet`

const nft_mint = `near call dev-1620252450193-6591749 nft_mint '{ "token_id": "SOMETokenID", "metadata": { "title": "SomeNFTTitle", "description": "SomeNFTDesci", "media": "https://i.imgur.com/ardmpqm.png" } }' --accountId=johnq.testnet`

const nft_mint = `near call dev-1620252450193-6591749 nft_mint '{ "token_id": "SOMETokenID" }' --accountId=johnq.testnet`


const nft_mint = `near call dev-1620252450193-6591749 nft_mint2 --accountId=johnq.testnet`

const nft_mint = `
near call dev-1620252450193-6591749 nft_mint '{ "owner_id": "johnq.testnet" }' --accountId=johnq.testnet
`

const nft_mint = `
near call dev-1620252450193-6591749 nft_mint '{ "owner_id2": "johnq.testnet" }' --accountId=johnq.testnet
`

const nft_mint = `
near call dev-1620252450193-6591749 nft_mint '{ "token_id": "johnq.testnet" }' --accountId=johnq.testnet
`


const nft_mint = `
near call dev-1620252450193-6591749 nft_mint --accountId=johnq.testnet
`



const nft_mint_metadata = {
  "token_id": "SOMETokenID",
  "metadata": {
    "title": "SomeNFTTitle",
    "description": "SomeNFTDesci",
    "media": "https://i.imgur.com/ardmpqm.png",
    "media_hash": "what is media_hash?",
    "copies": 3,
    "issued_at": "05/28/2021",
    "expires_at": "05/28/2031",
    "starts_at": "05/28/2021",
    "updated_at": "what is updated_at?",
    "extra": "SomeNFTExtra",
    "reference": "SomeNFTReference",
    "reference_hash": "SomeNFTReferenceHash"
  }
}
