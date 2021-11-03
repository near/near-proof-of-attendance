import { storage, Context, VMContext, u128 } from "near-sdk-as";
import {
  init,
  nft_mint,
  nft_transfer,
  nft_mint_batch,
  OwnerId,
} from "../index";

import {
  NFTMetadata,
  TokenMetadata,

} from "../metadata";

import {
  attendees,
  attendees_long,

} from "../attendees";

// import {
//   consoleLog
// } from "../utils";

// In Test suite by default Context.predecessor is "carol". So lets make OwnerId the same as predecessor
// const OwnerId: string = "carol";
// In Test suite by default Context.sender is "bod". So lets make SenderId the same as sender
export const TokenId: string = "SomeTokenId";
export const TokenId2: string = "SomeTokenId2";
export const SenderId: string = "bob";
export const ReceiverId: string = "johnq.testnet";

export const test_init = (): void => {
  // Where and What should this be?
  const reference_hash = 123213123;
  const metadata: NFTMetadata = new NFTMetadata("NFTSpec", "NFTName", "NFTSymbol", "NFTIcon", "NFTBaseURI", "NFTRef", reference_hash);
  init(OwnerId, metadata);
  const metadata_in_storage: string | null = storage.get("n", '');
  const metadata_in_storage_should_be = 
  `{\"spec\":\"NFTSpec\",\"name\":\"NFTName\",\"symbol\":\"NFTSymbol\",\"icon\":\"NFTIcon\",\"base_uri\":\"NFTBaseURI\",\"reference\":\"NFTRef\",\"reference_hash\":\"123213123\"}`;
  expect(metadata_in_storage).toBe(metadata_in_storage_should_be);
}

export const test_nft_mint = (): void => {
  // Set more attachedDeposit
  const attachedDeposit = u128.from(1700000);
  // Where and What should these hashes be?
  const media_hash = 123123;
  const copies = 10
  const reference_hash = 232323;
  const token_metadata: TokenMetadata = new TokenMetadata(
    "SomeNFTTitleasdasdasd", "SomeDescription", "https://i.imgur.com/ardmpqm.png", media_hash, 
    copies, "05/28/2021", "05/28/2031", "05/28/2021", 
    "what is updated_at?", "SomeNFTExtra", "SomeNFTReference", reference_hash
  );
  VMContext.setAttached_deposit(attachedDeposit);
  VMContext.setPredecessor_account_id(OwnerId);
  nft_mint(ReceiverId, TokenId, token_metadata);
}

export const test_nft_mint2 = (): void => {
  // Set more attachedDeposit
  const attachedDeposit = u128.from(1700000);
  // Where and What should these hashes be?
  const media_hash = 123323;
  const copies = 20
  const reference_hash = 242323;
  const token_metadata: TokenMetadata = new TokenMetadata(
    "SomeNFTTitle2", "SomeDescription2", "https://i.imgur.com/uxx7BQz.jpg", media_hash, 
    copies, "06/20/2021", "06/20/2031", "06/21/2021", 
    "what is updated_at? 2", "SomeNFTExtra2", "SomeNFTReference2", reference_hash
  );
  VMContext.setAttached_deposit(attachedDeposit);
  VMContext.setPredecessor_account_id(OwnerId);
  nft_mint(ReceiverId, TokenId2, token_metadata);
}

export const test_nft_transfer = (): void => {
  // Init NFT NFTMetadata
  test_init();  
  // Mint NFT TokenMetadata
  test_nft_mint();

  const attachedDepositTransfer = u128.from(1);
  const new_receiver_id = "johnqplay.testnet";
  const approval_id = 0;
  const memo = "SomeMemo";
  VMContext.setAttached_deposit(attachedDepositTransfer);
  VMContext.setPredecessor_account_id(OwnerId);
  nft_transfer(new_receiver_id, TokenId, approval_id, memo);
}

export const test_nft_mint_batch = (): void => {
  test_init(); 
  const attachedDeposit = u128.from(90000000);
  const accountBalance =  u128.from(90000000000);
  // Where and What should these hashes be?
  const media_hash = 123123;
  const copies = 10
  const reference_hash = 232323;
  const token_metadata: TokenMetadata = new TokenMetadata(
    "SomeNFTTitleasdasdasd", "SomeDescription", "https://i.imgur.com/ardmpqm.png", media_hash, 
    copies, "05/28/2021", "05/28/2031", "05/28/2021", 
    "what is updated_at?", "SomeNFTExtra", "SomeNFTReference", reference_hash
  );
  VMContext.setAccount_balance(accountBalance)
  VMContext.setAttached_deposit(attachedDeposit);
  VMContext.setPredecessor_account_id(OwnerId);
  // nft_mint_batch(attendees, token_metadata);
  nft_mint_batch(attendees_long, token_metadata);
}