import { APIS } from "@/src/config/apis";
import { ACCOUNT_ID, PLUGIN_URL } from "@/src/config/env";
import { INSTRUCTIONS } from "@/src/config/instructions";
import { NextResponse } from "next/server";

const key = JSON.parse(process.env.BITTE_KEY || "{}");

if (!key?.accountId) {
  console.error("no account");
}

export async function GET() {
  const pluginData = {
    openapi: "3.0.0",
    info: {
      title: "Meme cooking agent",
      description: "API for Meme cooking agent",
      version: "1.0.0",
    },
    servers: [
      {
        url: PLUGIN_URL,
      },
    ],
    "x-mb": {
      "account-id": ACCOUNT_ID,
      assistant: {
        name: "Meme.cooking",
        description:
          "It can helps user creating memecoins as also retrieving memecoin informations from Meme.cooking, like daily stats and specific memecoins information",
        instructions: INSTRUCTIONS,
        tools: [{ type: "generate-image" }, { type: "generate-transaction" }],
        image:
          "https://meme.cooking/_app/immutable/assets/meme-cooking.BVJrWOtS.webp",
      },
    },
    paths: {
      "/api/info": {
        get: {
          summary: "get latest indexed block height",
          description: "Returns latest indexed block height",
          operationId: "get-last-block-height",
          responses: {
            "200": {
              description: "latest indexed block height",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      last_block_height: {
                        type: "number",
                      },
                    },
                    required: ["last_block_height"],
                  },
                },
              },
            },
          },
        },
      },
      "/api/create-meme": APIS.CREATE,
      "/api/launches": APIS.LAUNCHES,
      "/api/daily-stats": APIS.STATS,
    },
  };

  return NextResponse.json(pluginData);
}
