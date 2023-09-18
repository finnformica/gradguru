import { NextRequest, NextResponse } from "next/server";

import { addData } from "@/firebase/utils";

export async function POST(request: NextRequest) {
  const { data, documentId, collection } = await request.json();

  const { result, error } = await addData(data, documentId, collection);

  if (error) {
    console.log("An error occured", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }

  return NextResponse.json({ message: "Success" }, { status: 200 });
}
