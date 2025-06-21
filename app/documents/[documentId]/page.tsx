"use client";

import CreateDocumentButton from "@/app/create-document-button";
import DocumentCard from "@/app/document-card";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export default function DocumentPage({
  params,
}: {
  params: { documentId: Id<"documents"> };
}) {
  const document = useQuery(api.documents.getDocument, {
    documentId: params.documentId,
  });

  if (!document) {
    return <div>{"You don't have access to view this file"}</div>;
  }

  return (
    <main className="p-24 space-y-8 bg-black text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{document?.title}</h1>
        {/* <CreateDocumentButton /> */}
      </div>
      <div className="flex bg-black gap-12">
   
        <div className="!bg-gray-900 p-4 flex-1 h-[600px]">
          {document?.documentUrl && (
            <iframe className="w-full" src={document?.documentUrl} frameBorder="0"></iframe>
          )}
              </div>
              <div className="w-[300px] h-full bg-gray-900">
                  
              </div>
      </div>
    </main>
  );
}
