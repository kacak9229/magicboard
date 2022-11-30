import { DefaultSession } from "next-auth";
import { type AdapterUser as $AdapterUser } from "next-auth/adapters";
import { Hunter } from "@prisma/client";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      hunterId?: string;
    } & DefaultSession["user"];
  }

  interface User extends $User {
    hunter?: Hunter;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser extends $AdapterUser {
    hunter?: Hunter;
  }
}
