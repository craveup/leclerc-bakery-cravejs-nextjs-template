import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locationId = searchParams.get("locationId");

  if (!locationId) {
    return NextResponse.json(
      { error: "Location ID is required" },
      { status: 400 },
    );
  }

  const apiKey =
    process.env.CRAVEUP_API_KEY || process.env.NEXT_PUBLIC_CRAVEUP_API_KEY;
  const apiBaseUrl =
    process.env.CRAVEUP_API_BASE_URL || "http://localhost:8000";

  if (!apiKey) {
    console.warn("CRAVEUP_API_KEY not found. API features will not work.");
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      `${apiBaseUrl}/api/v1/locations/${locationId}/products`,
      {
        headers: {
          "X-API-Key": apiKey,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Unknown error",
      }));
      return NextResponse.json(
        { error: error.message },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
