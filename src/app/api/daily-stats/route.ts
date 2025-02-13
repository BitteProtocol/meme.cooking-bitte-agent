import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const apiUrl = `https://api.meme.cooking/info/daily-stats`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data, "data");

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching daily stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch daily stats" },
      { status: 500 }
    );
  }
}
