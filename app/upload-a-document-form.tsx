"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { LoadingButton } from "@/components/loading-button";
import { Id } from "@/convex/_generated/dataModel";
const formSchema = z.object({
  title: z.string().min(1).max(250),
  file: z.instanceof(File),
});

export default function UploadDocumentForm({
  onUpload,
}: {
  onUpload: () => void;
}) {
  const createDocument = useMutation(api.documents.createDocument);
    const generateUploadURL = useMutation(api.documents.generateUploadURL);

  async function onSubmit(values: z.infer<typeof formSchema>) {
      const url = await generateUploadURL()
      console.log("URL:", url)

      const result = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": values?.file?.type },
          body:values?.file,
      })
      const { storageId} = await result.json()
     await createDocument({ title: values.title,fileId:storageId as Id<"_storage"> });
    onUpload();
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Expense Report" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                      <Input accept=".txt,.xml,.jpeg,.png,.doc,.jpg" type="file" {...fieldProps} onChange={(e)=> {
                          const file = e?.target?.files?.[0]
                          
                          onChange(file)
                      }} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          loadingText="Uploading..."
          isLoading={form.formState.isSubmitting}
        >
          Upload
        </LoadingButton>
      </form>
    </Form>
  );
}
