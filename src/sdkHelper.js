import { sdk } from "@farcaster/miniapp-sdk";

export async function initSDK() {
  await sdk.actions.ready();
  const context = await sdk.context;
  return context;
}
