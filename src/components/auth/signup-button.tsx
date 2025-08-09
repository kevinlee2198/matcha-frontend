"use server";

import { signIn } from "@/auth";
import { Button } from "../ui/button";

function SignUpButton() {
  async function handleSignUp() {
    "use server";
    // The third argument to signIn is for authorization parameters.
    // See https://www.keycloak.org/docs/latest/server_admin/#_registration-rc-client-flows
    await signIn("keycloak", {}, { prompt: "create" });
  }
  return (
    <form action={handleSignUp}>
      <Button type="submit">Sign Up</Button>
    </form>
  );
}

export default SignUpButton;
