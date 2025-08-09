"use server";

import { handleSignIn } from "@/server-actions/user/authentication";
import { Button } from "../ui/button";

function SignInButton() {
  return (
    <form action={handleSignIn}>
      <Button type="submit">Sign In</Button>
    </form>
  );
}

export default SignInButton;
