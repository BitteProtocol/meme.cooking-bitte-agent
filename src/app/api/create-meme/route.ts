import { NextResponse } from "next/server";

export async function GET(request: Request) {

  const nearToFormat = (near: number) => (near * 1e24).toString();

  try {
    console.log("Received request:", request.url);
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const symbol = searchParams.get("symbol");
    const website = searchParams.get("website");
    const telegram = searchParams.get("telegram");
    const twitter = searchParams.get("twitter");


    const teamAllocationPercent = parseFloat(
      searchParams.get("teamAllocationPercent") || "5"
    );
    const cliffPeriodDays = parseInt(
      searchParams.get("cliffPeriodDays") || "2"
    );
    const vestingPeriodDays = parseInt(
      searchParams.get("vestingPeriodDays") || "5"
    );


    const basePoints = Math.min(teamAllocationPercent * 100, 9000); // Max 90%

    // Validate team allocation
    if (basePoints > 9000) {
      console.log("Invalid team allocation base points");
      return NextResponse.json(
        {
          error: "team allocation base points must not exceed 90%",
        },
        { status: 400 }
      );

    }

    // Convert days to milliseconds for cliff and vesting periods
    const cliffPeriodMs = cliffPeriodDays * 24 * 60 * 60 * 1000;
    const vestingPeriodMs = vestingPeriodDays * 24 * 60 * 60 * 1000;

    // Retrieve and validate totalSupply from query parameters
    const totalSupply =
      searchParams.get("totalSupply") || 1000000000000000000000000000;
    const totalSupplyValue = BigInt(totalSupply);

    // Define min and max totalSupply
    const minTotalSupply = BigInt(1000);
    const maxTotalSupply = BigInt(1000000000000000000000000000);

    // Validate totalSupply
    if (
      totalSupplyValue < minTotalSupply ||
      totalSupplyValue > maxTotalSupply
    ) {
      console.log("Invalid totalSupply:", totalSupply);
      return NextResponse.json(
        {
          error: `totalSupply must be between ${minTotalSupply} and ${maxTotalSupply}`,
        },
        { status: 400 }
      );
    }

    const depositTokenId = searchParams.get("depositTokenId") || "wrap.near";
    // Retrieve and convert softCap and hardCap from query parameters
    const softCap = searchParams.get("softCap") || nearToFormat(100);
    const hardCap = searchParams.get("hardCap") || nearToFormat(500);

    // Convert softCap and hardCap to NEAR for validation
    const softCapNear = parseFloat(softCap) / 1e24;
    const hardCapNear = parseFloat(hardCap) / 1e24;

    // Define min and max caps in NEAR
    const minCapNear = 100;
    const maxCapNear = 4000;

    // Validate softCap and hardCap
    if (
      softCapNear < minCapNear ||
      softCapNear > maxCapNear ||
      hardCapNear < minCapNear ||
      hardCapNear > maxCapNear
    ) {
      console.log("Invalid softCap or hardCap:", softCap, hardCap);
      return NextResponse.json(
        {
          error: `softCap and hardCap must be between ${minCapNear} and ${maxCapNear} NEAR`,
        },
        { status: 400 }
      );
    }

    if (hardCapNear < softCapNear) {
      console.log("hardCap must be greater than or equal to softCap");
      return NextResponse.json(
        {
          error: "hardCap must be greater than or equal to softCap",
        },
        { status: 400 }
      );
    }

    const durationHours = searchParams.get("durationHours") || "1";
    const durationMs = parseInt(durationHours) * 3600000;

    // Validate durationHours
    const minDurationHours = 0.0833; // 5 minutes in hours
    const maxDurationHours = 24; // 24 hours
    const durationHoursValue = parseFloat(durationHours);

    if (
      durationHoursValue < minDurationHours ||
      durationHoursValue > maxDurationHours
    ) {
      console.log("Invalid durationHours:", durationHours);
      return NextResponse.json(
        {
          error: `durationHours must be between ${minDurationHours} and ${maxDurationHours} hours`,
        },
        { status: 400 }
      );
    }

    const description = searchParams.get("description") || "";
    const imageUrl = searchParams.get("imageUrl") || "";

    if (!name || !symbol) {
      console.log("Missing required parameters");
      return NextResponse.json(
        {
          error: "name and symbol are required parameters",
        },
        { status: 400 }
      );
    }

    const referenceMetadata = {
      description: description,
      twitterLink: twitter,
      telegramLink: telegram,
      website: website,
    };

    // Create form data
    const formData = new FormData();

    // Fetch image from URL and create file
    const imageResponse = await fetch(imageUrl);
    const imageBlob = await imageResponse.blob();
    formData.append("imageFile", imageBlob, "image.webp");

    // Add reference metadata
    formData.append("reference", JSON.stringify(referenceMetadata));

    console.log("Sending request to meme.cooking API...");
    // Upload reference metadata
    const uploadResponse = await fetch("https://meme.cooking/api/create", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.6",
        Origin: "https://meme.cooking",
        Referer: "https://meme.cooking/create",
      },
    });

    const { referenceCID, imageCID } = await uploadResponse.json();
    console.log("Received reference from meme.cooking:", referenceCID);

    if (!referenceCID) {
      console.log("Failed to generate reference metadata");
      return NextResponse.json(
        {
          error: "Failed to generate reference metadata",
        },
        { status: 500 }
      );
    }

    const transactionPayload = {
      receiverId: "meme-cooking.near",
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "create_meme",
            args: {
              duration_ms: durationMs,
              name,
              symbol,
              icon: imageCID,
              decimals: 18,
              total_supply: totalSupply,
              reference: referenceCID,
              reference_hash: "",
              deposit_token_id: depositTokenId,
              soft_cap: softCap,
              hard_cap: hardCap,
              team_allocation: [
                basePoints, // Use base points directly
                vestingPeriodMs,
                cliffPeriodMs,
              ],
            },
            gas: "300000000000000",
            deposit: "123560000000000000000000",
          },
        },
      ],
    };

    console.log("Generated transaction payload:", transactionPayload);
    return NextResponse.json({ transactionPayload });
  } catch (error) {
    console.error("Error generating meme creation transaction payload:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    const errorStack = error instanceof Error ? error.stack : undefined;

    console.error("Error details:", {
      message: errorMessage,
      stack: errorStack,
      type: error?.constructor?.name,
    });

    return NextResponse.json(
      {
        error: "Failed to generate meme creation transaction payload",
        details: {
          message: errorMessage,
          type: error?.constructor?.name,
        },
      },
      { status: 500 }
    );
  }
}
