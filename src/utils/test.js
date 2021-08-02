// Testing calling nft_mint contract works from UI.

const test_nft_metadata = { 
  "title": "SomeNFTTitle", 
  "description": "SomeNFTDesci", 
  "media": "https://i.imgur.com/ardmpqm.png",  
  "media_hash": "what is media_hash?", 
  "copies": "3", 
  "issued_at": "05/28/2021", 
  "expires_at": "05/28/2031", 
  "starts_at": "05/28/2021", 
  "updated_at": "what is updated_at?", 
  "extra": "SomeNFTExtra", 
  "reference": "SomeNFTReference", 
  "reference_hash": "SomeNFTReferenceHash" 
}

const test_nft_token = {
  owner_id: "johnq.testnet", 
  token_id: "ajd6r232323l.token_id", 
  ...test_nft_metadata,

}

export async function test_nft_mint() {
  const gas = 300000000000000;
  const deposit_amount = 33914902;
  const nft_mint_arguments = {
    owner_id: "johnq.testnet.near", 
    token_id: nft_token.token_id, 
    metadata: nft_token.metadata,
  }
  
  window.contract.nft_mint(
    nft_mint_arguments,
    gas,
    deposit_amount,

  );
}