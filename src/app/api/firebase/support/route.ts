import { NextRequest, NextResponse } from "next/server";

import { addData } from "../../../../../firebase/utils";

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  const { result, error } = await addData(
    {
      to: "hello@gradguru.app",
      message: {
        subject: "Important: New Support Request",
        text: `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`,
      },
    },
    null,
    "mail"
  );

  if (error) {
    console.log("An error occured", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }

  return NextResponse.json({ message: "Success" }, { status: 200 });
}
