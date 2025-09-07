"use server";

import { auth, signIn, signOut } from "@/auth";

export async function handleSignIn() {
  await signIn("keycloak"); // Make sure "keycloak" matches your provider ID
}

export async function handleSignOut() {
  await signOut();
}

export async function handleSignUp() {
  // The third argument to signIn is for authorization parameters.
  // See https://www.keycloak.org/docs/latest/server_admin/#_registration-rc-client-flows
  await signIn("keycloak", {}, { prompt: "create" });
}

export async function handlePrint() {
  const authentication = await auth();
  console.log(authentication?.accessToken);
}
