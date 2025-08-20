import { S3Client } from "@aws-sdk/client-s3";

const accountId = import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID;
const accessKeyId = import.meta.env.VITE_CLOUDFLARE_ACCESS_KEY_ID;
const secretAccessKey = import.meta.env.VITE_CLOUDFLARE_SECRET_ACCESS_KEY;

if (!accountId || !accessKeyId || !secretAccessKey) {
  throw new Error("Cloudflare R2 credentials are not set in the environment variables.");
}

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});