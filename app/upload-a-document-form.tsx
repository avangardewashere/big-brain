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
const formSchema = z.object({
  title: z.string().min(1).max(250),
});

export default function UploadDocumentForm({
  onUpload,
}: {
  onUpload: () => void;
}) {
  const createDocument = useMutation(api.documents.createDocument);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await createDocument({ title: values.title });
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
              <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
