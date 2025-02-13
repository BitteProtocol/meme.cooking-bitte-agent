export const RESPONSES = {
  "200": {
    description:
      "Returns all meme token launches as a detailed text list to the user.",
    content: {
      "text/plain": { // Changed from "application/json" to "text/plain"
        schema: {
          type: "string", // Changed from "array" to "string"
          description: "A detailed text list of meme token launches."
        },
      },
    },
  },
  "400": {
    description: "error",
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
};
