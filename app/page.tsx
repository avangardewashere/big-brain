"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import DocumentCard from "./document-card";
import { createDocument } from "@/convex/documents";
import { Button } from "@/components/ui/button";
import CreateDocumentButton from "./create-document-button";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 space-y-8">
      <div className=" w-full flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Documents</h1>
       <CreateDocumentButton /> 
      </div>
      

      <div className="grid grid-cols-4 gap-4">
        {documents?.map((doc, index) => (
          <DocumentCard key={index} document={doc} />
        ))}
      </div>
    </main>
  );
}
