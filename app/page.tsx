"use client";
import { api } from "@/convex/_generated/api";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated } = useConvexAuth();
  const documents = useQuery(api.documents.getDocuments);
  const createDocument = useMutation(api.documents.createDocument);
  useEffect(() => {
    console.log(isAuthenticated)
  })
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />

        <button
          onClick={() => {
          createDocument({ title: "hello world" });
          }}
        >
          Click Me
        </button>
        {JSON.stringify(documents)}
        {documents?.map((doc,index) => {
          return <div key={index}>{doc.title}</div>;
        })}
      </SignedIn>
    </main>
  );
}
