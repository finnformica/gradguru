import { NextRequest, NextResponse } from "next/server";

import type { FirestoreCollectionType } from "@/firebase/types";
import {
  addData,
  retrieveDocumentIds,
  retrieveDocument,
} from "@/firebase/utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  const collection = searchParams.get("collection") as FirestoreCollectionType;
  const document = searchParams.get("document");

  if (!collection) {
    return NextResponse.json(
      { message: "No collection provided" },
      { status: 400 }
    );
  } else if (!document) {
    const documentIds = await retrieveDocumentIds(collection);
    return NextResponse.json({ documentIds }, { status: 200 });
  } else {
    const data = await retrieveDocument(collection, document);
    return NextResponse.json({ data }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const { data, documentId, collection } = await request.json();

  const { result, error } = await addData(data, documentId, collection);

  if (error) {
    console.log("An error occured", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }

  return NextResponse.json({ message: "Success" }, { status: 200 });
}