"use server";

import { signIn } from "@/auth";
import { Button } from "../ui/button";

function SignInButton() {
  async function handleSignIn() {
    "use server";
    await signIn("keycloak"); // Make sure "keycloak" matches your provider ID
  }
  return (
    <form action={handleSignIn}>
      <Button type="submit">Sign In</Button>
    </form>
  );
}

export default SignInButton;
