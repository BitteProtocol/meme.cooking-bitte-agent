export const RESPONSES = {
  "200": {
    description: "Transaction payload for creating meme token",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            transactionPayload: {
              type: "object",
              properties: {
                receiverId: {
                  type: "string",
                },
                actions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                      },
                      params: {
                        type: "object",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "400": {
    description:
      "Missing required parameters or invalid soft cap (minimum: 100000000000000000000000000)",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            error: {
              type: "string",
            },
          },
        },
      },
    },
  },
  "500": {
    description: "Server error",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            error: {
              type: "string",
            },
          },
        },
      },
    },
  },
}