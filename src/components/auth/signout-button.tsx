"use server";

import { signOut } from "@/auth";
import { Button } from "../ui/button";

function SignOutButton() {
  async function handleSignOut() {
    "use server";
    await signOut();
  }
  return (
    <form action={handleSignOut}>
      <Button type="submit" variant="outline">
        Sign Out
      </Button>
    </form>
  );
}

export default SignOutButton;
