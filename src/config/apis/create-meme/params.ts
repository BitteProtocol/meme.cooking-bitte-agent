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
    required: true,
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
      "Soft cap for the memecoin (minimum value: 100 N)",
    required: true,
    schema: {
      type: "string",
      default: '100 N',
    },
  },
  {
    name: "hardCap",
    in: "query",
    description: "Hard cap for the memecoin (value must be higher then soft cap and max cap value is 4000 N)",
    required: true,
    schema: {
      type: "string",
      default: "500 N",
    },
  },
  {
    name: "durationHours",
    in: "query",
    description:
      "Duration in hours (minimum: 5 minutes, maximum: 24 hours)",
    required: true,
    schema: {
      type: "string",
      default: "24",
    },
  },
  {
    name: "vestingPeriodDays",
    in: "query",
    description:
      "vest period days of the team allocated tokens,  this parameter is not required is optional, if user doesnt set,please use default",
    required: false,
    schema: {
      type: "string",
      default: "2",
    },
  },
  {
    name: "cliffPeriodDays",
    in: "query",
    description:
      "Cliff period days of the team allocated tokens,  this parameter is not required is optional, if user doesnt set,please use default",
    required: false,
    schema: {
      type: "string",
      default: "2",
    },
  },
  {
    name: "teamAllocationPercent",
    in: "query",
    description:
      "Percentage of memecoin tokens allocated to the team,  this parameter is not required is optional, if user doesnt set,please use default",
    required: false,
    schema: {
      type: "string",
      default: "5",
    },
  },
  {
    name: "website",
    in: "query",
    description:
      "Token website address, this parameter is not required is optional",
    required: false,
    schema: {
      type: "string",
      default: 'https://meme.cooking',
    },
  },
  {
    name: "telegram",
    in: "query",
    description:
      "Token telegram channel, this parameter is not required is optional",
    required: false,
    schema: {
      type: "string",
      default: 'https://t.me/memedotcookinsupports',
    },
  },
  {
    name: "twitter",
    in: "query",
    description:
      "Token twitter channel, this parameter is not required is optional",
    required: false,
    schema: {
      type: "string",
      default: 'https://t.me/memedotcookin',
    },
  },
  {
    name: "imageUrl",
    in: "query",
    description:
      "URL of the image to use for the memecoin,accepted image formats: jpg,jpeg,png,gif,webp and avif.",
    required: false,
    schema: {
      type: "string",
      default:
        "https://meme.cooking/_app/immutable/assets/meme-cooking.BVJrWOtS.webp",
    },
  },
]