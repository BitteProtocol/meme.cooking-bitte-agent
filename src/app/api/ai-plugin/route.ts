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
                instructions: "You cook memecoins. First generate an image or accept a valid image url the accepted image formats are: webp,gif,jpg,png and avif., then use that image to create the memecoin.If the image url is not a valid url,Always generate a new image before creating the memecoin.When a new image is generated, recreate the memecoin using the previously provided values (name, symbol, description, etc) with the newly generated image.",
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
            "/api/create-meme": {
                get: {
                    summary: "Create a new memecoin",
                    description: "Generates a transaction payload for creating a new memecoin. It requires the following parameters: name, symbol, depositTokenId, softCap (minimum 100000000000000000000000000), hardCap, durationMs.",
                    operationId: "create-meme",
                    parameters: [
                        {
                            name: "name",
                            in: "query",
                            description: "Name of the memecoin",
                            required: true,
                            schema: {
                                type: "string"
                            }
                        },
                        {
                            name: "description",
                            in: "query",
                            description: "Description of the memecoin",
                            required: false,
                            schema: {
                                type: "string"
                            }
                        },
                        {
                            name: "symbol",
                            in: "query",
                            description: "Symbol of the memecoin",
                            required: true,
                            schema: {
                                type: "string"
                            }
                        },
                        {
                            name: "depositTokenId",
                            in: "query",
                            description: "Deposit token ID (defaults to wrap.near)",
                            required: false,
                            schema: {
                                type: "string",
                                default: "wrap.near"
                            }
                        },
                        {
                            name: "softCap",
                            in: "query",
                            description: "Soft cap for the memecoin (minimum value: 100000000000000000000000000)",
                            required: false,
                            schema: {
                                type: "string",
                                default: "100000000000000000000000000",
                            }
                        },
                        {
                            name: "hardCap",
                            in: "query",
                            description: "Hard cap for the memecoin",
                            required: false,
                            schema: {
                                type: "string",
                                default: "500000000000000000000000000"
                            }
                        },
                        {
                            name: "durationMs",
                            in: "query",
                            description: "Duration in milliseconds",
                            required: false,
                            schema: {
                                type: "string",
                                default: "3600000"
                            }
                        },
                        {
                            name: "imageUrl",
                            in: "query",
                            description: "URL of the image to use for the memecoin,accepted image formats: jpg,png,gif,webp and avif.",
                            required: false,
                            schema: {
                                type: "string",
                                default: ""
                            }
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Transaction payload for creating memecoin",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            transactionPayload: {
                                                type: "object",
                                                properties: {
                                                    receiverId: {
                                                        type: "string"
                                                    },
                                                    actions: {
                                                        type: "array",
                                                        items: {
                                                            type: "object",
                                                            properties: {
                                                                type: {
                                                                    type: "string"
                                                                },
                                                                params: {
                                                                    type: "object"
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Missing required parameters or invalid soft cap (minimum: 100000000000000000000000000)",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Server error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    return NextResponse.json(pluginData);
}