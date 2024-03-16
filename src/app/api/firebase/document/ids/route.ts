import { NextRequest, NextResponse } from "next/server";

import type { FirestoreCollectionType } from "lib/firebase/types";
import { retrieveDocumentIds } from "lib/firebase/utils";

// READ, retrieve all document ids
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  const collection = searchParams.get("collection") as FirestoreCollectionType;

  if (!collection) {
    return NextResponse.json(
      { message: "No collection provided" },
      { status: 400 }
    );
  } else {
    const documentIds = await retrieveDocumentIds(collection);
    return NextResponse.json({ documentIds }, { status: 200 });
  }
}
