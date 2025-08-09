"use server";

import { handleSignOut } from "@/server-actions/user/authentication";
import { Button } from "../ui/button";

function SignOutButton() {
  return (
    <form action={handleSignOut}>
      <Button type="submit" variant="outline">
        Sign Out
      </Button>
    </form>
  );
}

export default SignOutButton;
