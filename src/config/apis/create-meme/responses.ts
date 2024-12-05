export const RESPONSES = {
  "200": {
    description: "Transaction payload for creating meme token, returns the transaction payload and the meme url, show the https://meme.cooking url to the user",
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
                  description: "Receiver ID for the transaction",
                },
                actions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        description: "Type of action to perform",
                      },
                      params: {
                        type: "object",
                        properties: {
                          methodName: {
                            type: "string",
                            description: "Name of the method to call",
                          },
                          args: {
                            type: "object",
                            description: "Arguments for the method",
                          },
                          gas: {
                            type: "string",
                            description: "Gas limit for the transaction",
                          },
                          deposit: {
                            type: "string",
                            description: "Deposit amount for the transaction",
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
              description: "Error message detailing the issue",
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
              description: "Error message detailing the server issue",
            },
          },
        },
      },
    },
  },
}