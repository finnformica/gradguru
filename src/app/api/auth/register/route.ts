import bcrypt from "bcrypt";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

import { postUser } from "@/api/user";
import { db } from "@/firebase/config";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new NextResponse("Missing name, email, or password", {
      status: 400,
    });
  }

  // check if user exists
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  // throw error if user exists
  if (!querySnapshot.empty) {
    return new NextResponse("Email already in use", { status: 400 });
  }

  // create user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    name,
    email,
    password: hashedPassword,
    role: 1,
    courses: [],
  };

  postUser(null, newUser);

  return new NextResponse("User created", { status: 200 });
}
