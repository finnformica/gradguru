import { NextRequest, NextResponse } from "next/server";

import type { FirestoreCollectionType } from "firebase/types";
import {
  addData,
  retrieveAllDocuments,
  retrieveDocument,
  deleteDocument,
} from "firebase/utils";

// READ, retrieve all documents or a single document
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  const collection = searchParams.get("collection") as FirestoreCollectionType;
  const document = searchParams.get("document");

  if (!collection) {
    // if no collection is provided, throw an error
    return NextResponse.json(
      { message: "No collection provided" },
      { status: 400 }
    );
  } else if (!document) {
    // if no document is provided, retrieve all documents
    const documents = await retrieveAllDocuments(collection);
    return NextResponse.json({ documents }, { status: 200 });
  } else {
    // if document is provided, retrieve that document
    const data = await retrieveDocument(collection, document);
    return NextResponse.json({ data }, { status: 200 });
  }
}

// CREATE or UPDATE (for update, provide document id)
export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  const collection = searchParams.get("collection") as FirestoreCollectionType;
  const document = searchParams.get("document");

  const data = await request.json();

  // if no collection is provided, throw an error
  if (!collection) {
    return NextResponse.json(
      { message: "No collection provided" },
      { status: 400 }
    );
  }

  const updatedData = { ...data, created: Date.now() }; // add created timestamp
  delete updatedData.id; // remove id if it exists

  const { error } = await addData(updatedData, document, collection);

  if (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }

  return NextResponse.json({ message: "Success" }, { status: 200 });
}

// DELETE, provide collection and document id
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  const collection = searchParams.get("collection") as FirestoreCollectionType;
  const document = searchParams.get("document");

  if (!collection || !document) {
    return NextResponse.json(
      { message: "No collection or document provided" },
      { status: 400 }
    );
  }

  await deleteDocument(collection, document);

  return NextResponse.json({ message: "Success" }, { status: 200 });
}
