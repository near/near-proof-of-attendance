import { logging } from "near-sdk-as";

export function nft_mint_event(owner_id: string, token_ids: string): void {
  logging.log(
    `EVENT_JSON:{"standard": "nep171","version": "1.0.0","event": "nft_mint","data": [{"owner_id": "${owner_id.toString()}", "token_ids": ["${token_ids}"]}]}`
  );
}
