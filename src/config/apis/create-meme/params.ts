export const PARAMS = [
  {
    name: "name",
    in: "query",
    description: "Name of the memecoin",
    required: true,
    schema: {
      type: "string",
    },
  },
  {
    name: "description",
    in: "query",
    description: "Description of the memecoin",
    required: false,
    schema: {
      type: "string",
    },
  },
  {
    name: "symbol",
    in: "query",
    description: "Symbol of the memecoin",
    required: true,
    schema: {
      type: "string",
    },
  },
  {
    name: "symbol",
    in: "query",
    description: "Symbol of the meme token",
    required: true,
    schema: {
      type: "string",
    },
  },
  {
    name: "depositTokenId",
    in: "query",
    description: "Deposit token ID (defaults to wrap.near)",
    required: false,
    schema: {
      type: "string",
      default: "wrap.near",
    },
  },
  {
    name: "softCap",
    in: "query",
    description:
      "Soft cap for the memecoin (minimum value: 100000000000000000000000000)",
    required: false,
    schema: {
      type: "string",
      default: "100000000000000000000000000",
    },
  },
  {
    name: "hardCap",
    in: "query",
    description: "Hard cap for the memecoin",
    required: false,
    schema: {
      type: "string",
      default: "500000000000000000000000000",
    },
  },
  {
    name: "durationHours",
    in: "query",
    description:
      "Duration in hours (minimum: 5 minutes, maximum: 24 hours)",
    required: false,
    schema: {
      type: "string",
      default: "24", // Default to 24h
    },
  },
  {
    name: "imageUrl",
    in: "query",
    description:
      "URL of the image to use for the memecoin,accepted image formats: jpg,png,gif,webp and avif.",
    required: false,
    schema: {
      type: "string",
      default:
        "https://meme.cooking/_app/immutable/assets/meme-cooking.BVJrWOtS.webp",
    },
  },
]