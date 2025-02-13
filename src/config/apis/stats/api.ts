const RESPONSES = {
  "200": {
    description: "Daily meme statistics",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              date: { type: "string" },
              total_memes: { type: "number" },
              total_launched_memes: { type: "number" },
              total_finalized_memes: { type: "number" },
              last_change_ms: { type: "number", nullable: true },
            },
            required: [
              "date",
              "total_memes",
              "total_launched_memes",
              "total_finalized_memes",
              "last_change_ms",
            ],
          },
        },
      },
    },
  },
};

export const PROMPT_DESC = `Returns daily statistics about memes. The Number total of Memes, the number of finalized memes and number of launched memes.`;

const OP_ID = "daily-stats";

const SUMMARY =
  "Returns daily statistics about memes. The Number total of Memes, the number of finalized memes and number of launched memes.";

export const STATS = {
  get: {
    summary: SUMMARY,
    description: PROMPT_DESC,
    operationId: OP_ID,
    parameters: [],
    responses: RESPONSES,
  },
};
