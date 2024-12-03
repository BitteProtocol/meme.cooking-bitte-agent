import { APIS } from "@/src/config/apis";
import { NextResponse } from "next/server";


const key = JSON.parse(process.env.BITTE_KEY || "{}");
const config = JSON.parse(process.env.BITTE_CONFIG || "{}");

if (!key?.accountId) {
    console.error("no account");
}

export async function GET() {
    const pluginData = {
        openapi: "3.0.0",
        info: {
            title: "Boilerplate",
            description: "API for the boilerplate",
            version: "1.0.0",
        },
        servers: [
            {
                url: config.url,
            },
        ],
        "x-mb": {
            "account-id": key.accountId,
            assistant: {
                name: "Meme.cooking",
                description: "An assistant that cooks memecoins",
                instructions: "You cook memecoins. First generate an image or accept a valid image url with any of the accepted image formats are: webp,gif,jpg,png and avif.Then use that image to create the memecoin.If the image url is not a valid url,Always generate a new image before creating the memecoin.When a new image is generated, recreate the memecoin using the previously provided values (name, symbol, description, etc) with the newly generated image.",
                tools: [{ type: "generate-image" }, { type: "generate-transaction" }],
                image: "https://meme.cooking/_app/immutable/assets/meme-cooking.BVJrWOtS.webp"
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
                                                type: "number"
                                            }
                                        },
                                        required: ["last_block_height"]
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/create-meme": APIS.CREATE
        }
    };

    return NextResponse.json(pluginData);
}