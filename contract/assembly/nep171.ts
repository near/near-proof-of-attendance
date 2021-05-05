import { Context, logging, storage, context } from 'near-sdk-as'

import {
  AccountId,
  Token,
  TokenId,
  TokenMetadata,
  NFTCore,
  NFTMetadata,
  Storage,
  HashMap,
} from "./types"

const DEFAULT_MESSAGE = "Hello AFTER CREATION OF NEP171 Class";

@nearBindgen
export class NEP171 implements NFTCore {

  // Properties
  private static instance: NEP171;

  // Initializers/
  private constructor() { }

  public static getInstance(): NEP171 {
      if (!NEP171.instance) {
          NEP171.instance = new NEP171();
      }
      return NEP171.instance;
  }

  // Changes Methods
  public setGreeting(message: string): void {
    const account_id = Context.sender;
    logging.log('Saving greeting "' + message + '" for account "' + account_id + '" thru class');
    storage.set(account_id, message);
  }

  public nft_transfer(receiver_id: string, token_id: string, approval_id: number | null, meme: string | null): void {

  };

  public nft_transfer_call(receiver_id: string, token_id: string, approval_id: number | null, meme: string | null): Promise {
    return new Promise();
  };

  public nft_approve(token_id: TokenId, account_id: string, msg: string | null ): void  {}

  public nft_revoke(token_id: string, account_id: string): void {}

  public nft_revoke_all(token_id: string): void {}

  public nft_mint(token_id: TokenId, metadata: TokenMetadata): void {

  }

  // View Methods
  public getGreeting(accountId: string): string | null {
    const greeting = storage.get<string>(accountId, DEFAULT_MESSAGE);
    logging.log(`Current Greeting: ${greeting}`);
    return storage.get<string>(accountId, DEFAULT_MESSAGE)
  }

  public nft_token(token_id: string): Token | null {
    logging.log(`nft_token(${token_id})`);
  };

  public nft_resolve_transfer(owner_id: string, receiver_id: string, token_id: string, approved_account_ids: HashMap | null): boolean {

  }

  public nft_metadata(): NEP171Metadata {

  }

  public nft_total_supply(): string {

  }

  public nft_tokens(from_index: string| null, limit: number | null): Token[] {

  }

  public nft_supply_for_owner(account_id: string): string {

  }

  public nft_tokens_for_owner(account_id: string, from_index: string | null, limit: number| null): Token[] {

  }

  public nft_is_approved(token_id: string, approved_account_id: string, approval_id: number | null): boolean {}

  // Receiver/Event Methods
  public nft_on_transfer(sender_id: string, previous_owner_id: string, token_id: string, msg: string): Promise<boolean> {

  }

  public nft_on_approve(token_id: TokenId, owner_id: string, approval_id: number, msg: string): void {}
  
  public nft_resolve_transfer(owner_id: AccountId, receiver_id: AccountId, approved_account_ids: HashMap, token_id: TokenId): void {
    
  } 
  
  // TODO: create nft_on_revoke event accourding to NEAR/core-contracts/nft-simple/src/nft_core.rs
  public nft_on_revoke(): void {

  }
  
    // TODO: create nft_on_revoke event
  
  // Private/Internal Methods
  private internal_add_token_to_owner(account_id: AccountId, token_id: TokenId): void {

  }

  private internal_remove_token_from_owner(account_id: AccountId, token_id: TokenId): void {

  }

  private internal_transfer(sender_id: string, receiver_id: string, token_id: TokenId, approval_id: number, memo: string): Token {

  }


}
