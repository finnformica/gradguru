import { NextRequest, NextResponse } from "next/server";

import type { FirestoreCollectionType } from "@/firebase/types";
import { retrieveDocumentIds } from "@/firebase/utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  const collection = searchParams.get("collection") as FirestoreCollectionType;

  if (!collection) {
    return NextResponse.json(
      { message: "No collection provided" },
      { status: 400 }
    );
  } else if (!document) {
    const documentIds = await retrieveDocumentIds(collection);
    return NextResponse.json({ documentIds }, { status: 200 });
  }
}
