This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Set up Debugging

Follow the instructions at [the Next.js debugging guide](https://nextjs.org/docs/app/guides/debugging)

## Main Development Guide to this Project

### UI Components

This project uses [tailwind css](https://tailwindcss.com/) and [shadcn](https://ui.shadcn.com/docs/components) to style and create components.
If a component does not exist then look at shadcn and see if it can be created in the project.

### Authentication

This project uses using [Auth.js](https://authjs.dev/) for authentication. We are using the version 5 (beta)

### Best Practices

1. Load data in server components whenever possible
2. Use server actions when possible

## Auth Setup

This package uses Next Auth Version 5. You need a secret key. Run

```bash
npx auth secret
```

One time to generate a secret key in the `.env.local` file

### Keycloak Realm and Client setup

We are using Keycloak as our IDP. Check the **match-backend** package for a docker compose file for Keycloak.

Run `./gradlew :bootRun --args='--spring.profiles.active=dev'` to start up the backend server and the Keycloak instance.
Run `docker compose up -d` if you only want to spin up Keycloak for some reason.

Go to `http://localhost:8080` to view the KeyCloak UI. The username and password are both "admin"

Create a realm in Keycloak with the Realm name: matcha

Create a client with the following properties:

- client-id: matcha-web
- Root URL: http://localhost:3000
- Home URL: http://localhost:3000
- Valid redirect URIs: /api/auth/callback/keycloak
- Client authentication: On
- Authentication Flow: Standard AND Direct Access Grants

Add this as the callback URL in keycloak: `[origin]/api/auth/callback/keycloak`

### Keycloak Registration Setup

By default, Keycloak disables user registration unless you explicitly enable it.

Go to Realm Settings -> Login
Enable:

- User registration
- Email as username
- Login with email

### Add Keycloak Credentials to .env

Add the following you received from KeyCloak the `.env.local` file

```
AUTH_SECRET={} # Added by `npx auth`. Read more: https://cli.authjs.dev
AUTH_KEYCLOAK_ID={CLIENT_ID} -> matcha-web
AUTH_KEYCLOAK_SECRET={CLIENT_SECRET} - client -> Credentials -> Client Secret
AUTH_KEYCLOAK_ISSUER={ISSUER_URL} -> https://localhost:8080/realms/matcha

NEXT_PUBLIC_MATCHA_API_BASE_URL=http://localhost:8000
```
