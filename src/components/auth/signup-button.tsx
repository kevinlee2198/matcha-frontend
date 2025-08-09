"use server";

import { handleSignUp } from "@/server-actions/user/authentication";
import { Button } from "../ui/button";

function SignUpButton() {
  return (
    <form action={handleSignUp}>
      <Button type="submit">Sign Up</Button>
    </form>
  );
}

export default SignUpButton;
