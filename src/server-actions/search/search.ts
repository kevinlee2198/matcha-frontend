"use server";

import { redirect } from "next/navigation";

export async function handleSearch(formData: FormData) {
  const query = formData.get("q")?.toString().trim();

  if (!query) {
    return; // or maybe redirect to home
  }

  // You could also log, filter, or do DB work here if needed
  redirect(`/search?q=${encodeURIComponent(query)}`);
}
