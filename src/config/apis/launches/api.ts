import { PARAMS } from "./params";
import { RESPONSES } from "./responses";

export const PROMPT_DESC =
  `Returns all meme token launches as a text list, ordering by Ordering params.
  Valid params are created_blockheight, meme_id, total_deposit, total_deposit_fees, total_withdraw_fees, end_timestamp_ms, last_change_ms.
  They are optional but should fallback always to created_blockheight.`;

const OP_ID = "token-launches";

const SUMMARY =
  "Returns all meme token launches in a nice detailed text list to the user.";

export const Launches = {
  get: {
    summary: SUMMARY,
    description: PROMPT_DESC,
    operationId: OP_ID,
    parameters: PARAMS,
    responses: RESPONSES,
  },
};
