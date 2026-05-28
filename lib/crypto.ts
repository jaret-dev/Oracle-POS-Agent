import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const ALG = "aes-256-gcm";
const IV_LEN = 12;
const TAG_LEN = 16;

function key(): Buffer {
  const hex = process.env.ENCRYPTION_KEY;
  if (!hex || !/^[0-9a-f]{64}$/.test(hex)) {
    throw new Error(
      "[crypto] ENCRYPTION_KEY must be a 64-char hex string (32 bytes). Generate with `openssl rand -hex 32`."
    );
  }
  return Buffer.from(hex, "hex");
}

/**
 * Encrypts plaintext under AES-256-GCM.
 * Returns "<iv_hex>.<tag_hex>.<ciphertext_b64>" so we can store as one column.
 */
export function encrypt(plaintext: string): string {
  const iv = randomBytes(IV_LEN);
  const cipher = createCipheriv(ALG, key(), iv);
  const enc = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("hex")}.${tag.toString("hex")}.${enc.toString("base64")}`;
}

export function decrypt(blob: string): string {
  const [ivHex, tagHex, ctB64] = blob.split(".");
  if (!ivHex || !tagHex || !ctB64) {
    throw new Error("[crypto] malformed encrypted blob");
  }
  const iv = Buffer.from(ivHex, "hex");
  const tag = Buffer.from(tagHex, "hex");
  if (iv.length !== IV_LEN || tag.length !== TAG_LEN) {
    throw new Error("[crypto] bad iv/tag length");
  }
  const decipher = createDecipheriv(ALG, key(), iv);
  decipher.setAuthTag(tag);
  const ct = Buffer.from(ctB64, "base64");
  return Buffer.concat([decipher.update(ct), decipher.final()]).toString("utf8");
}
