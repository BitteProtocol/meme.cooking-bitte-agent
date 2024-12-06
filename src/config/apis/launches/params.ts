export const PARAMS = [
  {
    name: "order_by",
    in: "query",
    description:
      "Ordering params, valid params are created_blockheight,meme_id,total_deposit,total_deposit_fees,total_withdraw_fees,end_timestamp_ms,last_change_ms and they optional but should fallback always to created_blockheight",
    required: false,
    schema: {
      type: "string",
      default: "created_blockheight",
    },
  },
  {
    name: "order_by_direction",
    in: "query",
    description: "Direction of the ordering asc or desc",
    required: false,
    schema: {
      type: "string",
      default: "desc",
    },
  },
];
