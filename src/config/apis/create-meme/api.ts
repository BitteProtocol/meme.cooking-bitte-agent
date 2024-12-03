import { PARAMS } from "./params";
import { RESPONSES } from "./responses";

const PROMPT_DESC =
  "Generates a transaction payload for creating a new memecoin. It requires the following parameters: name, symbol, depositTokenId, softCap (minimum 100000000000000000000000000), hardCap, durationMs.";

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
