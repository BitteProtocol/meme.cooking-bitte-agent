import { PARAMS } from "./params";
import { RESPONSES } from "./responses";

export const PROMPT_DESC =
  "Generates a transaction payload for creating a new memecoin on meme.cooking platform. It requires the following parameters: name, symbol, description, imageUrl,  the following ones are optional and should use default value if not set by user:  depositTokenId, softCap (minimum 100000000000000000000000000), hardCap, durationHours, vestingPeriodDays, cliffPeriodDays, teamAllocationPercent, website, twitter, telegram. It returns a transaction hash and meme url";

const OP_ID = "create-memecoin";

const SUMMARY = "Create a new memecoin";

export const CreateMeme = {
  get: {
    summary: SUMMARY,
    description: PROMPT_DESC,
    operationId: OP_ID,
    parameters: PARAMS,
    responses: RESPONSES,
  },
};
