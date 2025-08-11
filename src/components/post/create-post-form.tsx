"use client";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/server-actions/post/save-post";
import { createPostSchema } from "@/server-actions/post/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

function CreatePostForm() {
  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      subject: {
        name: "",
        age: undefined,
        height: undefined,
        location: "",
        ethnicity: "",
        occupation: "",
        college: "",
      },
    },
  });

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Create a New Post
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(createPost)}
          className="bg-card border border-border rounded-xl p-8 space-y-10 shadow-sm hover:shadow-lg transition-shadow"
        >
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="e.g. Should I give him a second chance?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    required
                    placeholder="Explain your situation in detail..."
                    className="min-h-[10rem]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can share text messages, context, and ask for advice.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subject Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium">
              Person You&apos;re Posting About
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="subject.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input required placeholder="e.g. John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Age */}
              <FormField
                control={form.control}
                name="subject.age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Age"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Height */}
              <FormField
                control={form.control}
                name="subject.height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 180"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="subject.location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. NYC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Ethnicity */}
              <FormField
                control={form.control}
                name="subject.ethnicity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ethnicity</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Hispanic" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Occupation */}
              <FormField
                control={form.control}
                name="subject.occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* College */}
              <FormField
                control={form.control}
                name="subject.college"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Stanford" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Submit Post
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreatePostForm;
