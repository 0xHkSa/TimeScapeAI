import { createThirdwebClient } from "thirdweb";

const clientID = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientID) {
  throw new Error("NEXT_PUBLIC_THIRDWEB_CLIENT_ID is not set");
}

export const client = createThirdwebClient({
  clientId: clientID,
});
