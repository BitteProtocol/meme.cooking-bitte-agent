import { NextResponse } from "next/server";

interface Launch {
  meme_id: number;
  owner: string;
  end_timestamp_ms: number;
  name: string;
  symbol: string;
  decimals: number;
  total_supply: string;
  reference: string;
  reference_hash: string;
  deposit_token_id: string;
  soft_cap: string;
  hard_cap: string;
  last_change_ms: number;
  team_allocation: string;
  vesting_duration_ms: string;
  cliff_duration_ms: string;
  created_blockheight: string;
  created_timestamp_ms: number;
  total_deposit: string;
  total_deposit_fees: string;
  total_withdraw_fees: string;
  is_finalized: boolean;
  token_id: string;
  pool_id: number;
  description: string;
  twitter_link: string;
  telegram_link: string;
  website: string;
  image: string;
  twitter_verified: boolean;
  twitter_user_id: string;
  twitter_username: string;
  replies_count: number;
  staker_count: number;
}


function formatLaunchesResponse(response: Launch) {
  if (!Array.isArray(response)) {
    return "Invalid response format.";
  }

  return response.map((launch) => ({
    memeId: launch.meme_id,
    owner: launch.owner,
    endTimestamp: new Date(launch.end_timestamp_ms).toLocaleString(),
    name: launch.name,
    symbol: launch.symbol,
    decimals: launch.decimals,
    totalSupply: launch.total_supply,
    reference: launch.reference,
    referenceHash: launch.reference_hash,
    depositTokenId: launch.deposit_token_id,
    softCap: launch.soft_cap,
    hardCap: launch.hard_cap,
    lastChange: new Date(launch.last_change_ms).toLocaleString(),
    teamAllocation: launch.team_allocation,
    vestingDuration: launch.vesting_duration_ms,
    cliffDuration: launch.cliff_duration_ms,
    createdBlockheight: launch.created_blockheight,
    createdTimestamp: new Date(launch.created_timestamp_ms).toLocaleString(),
    totalDeposit: launch.total_deposit,
    totalDepositFees: launch.total_deposit_fees,
    totalWithdrawFees: launch.total_withdraw_fees,
    isFinalized: launch.is_finalized,
    tokenId: launch.token_id,
    poolId: launch.pool_id,
    description: launch.description,
    twitterLink: launch.twitter_link,
    telegramLink: launch.telegram_link,
    website: launch.website,
    image: launch.image,
    twitterVerified: launch.twitter_verified,
    twitterUserId: launch.twitter_user_id,
    twitterUsername: launch.twitter_username,
    repliesCount: launch.replies_count,
    stakerCount: launch.staker_count,
  }));
}

export async function GET(request: Request) {
  // ... existing code ...

  const { searchParams } = new URL(request.url);
  const orderBy = searchParams.get("order_by") || "created_blockheight";
  const orderByDirection = searchParams.get("order_by_direction") || "desc";

  try {
    const response = await fetch(
      `https://api.meme.cooking/meme?order_by=${orderBy}&order_by_direction=${orderByDirection}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching memes: ${response.statusText}`);
    }

    const res = formatLaunchesResponse(await response.json())

    return NextResponse.json(res);
    // Process the memes as needed
  } catch (error) {
    console.error("Failed to fetch memes:", error);
    // Handle the error appropriately, e.g., return a response with an error message

    return NextResponse.json(
      { error: "Failed to fetch info data" },
      { status: 500 }
    );
  }

  // ... existing code ...
}
