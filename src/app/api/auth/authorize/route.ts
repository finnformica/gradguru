import bcrypt from "bcrypt";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/firebase/config";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return new NextResponse("Missing email, or password", {
      status: 400,
    });
  }

  // check if user exists
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  // throw error if user does not exist
  if (querySnapshot.empty) {
    return new NextResponse("No account is associated with the given email", {
      status: 400,
    });
  }

  const user = querySnapshot.docs[0].data();

  // authorize user
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return new NextResponse("Invalid password", { status: 400 });
  }

  return NextResponse.json({ data: "Authorized", body: user }, { status: 200 });
}
