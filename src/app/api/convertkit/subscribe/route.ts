import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.CONVERTKIT_API_KEY;
const FORM_ID = process.env.CONVERTKIT_SUBSCRIBE_FORM_ID;
const TAG_ID = process.env.CONVERTKIT_SUBSCRIBE_TAG_ID;
const BASE_URL = "https://api.convertkit.com/v3/";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const response = await fetch(`${BASE_URL}/forms/${FORM_ID}/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: API_KEY,
      email,
      tags: [TAG_ID],
    }),
  });

  if (response.ok) {
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}
