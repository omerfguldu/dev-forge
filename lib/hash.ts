import CryptoJS from "crypto-js";

export const HASH_ALGORITHMS = ["MD5", "SHA-1", "SHA-256", "SHA-512"] as const;
export type HashAlgorithm = (typeof HASH_ALGORITHMS)[number];

const HASHERS: Record<HashAlgorithm, (text: string) => CryptoJS.lib.WordArray> =
  {
    MD5: CryptoJS.MD5,
    "SHA-1": CryptoJS.SHA1,
    "SHA-256": CryptoJS.SHA256,
    "SHA-512": CryptoJS.SHA512,
  };

export function computeHash(text: string, algorithm: HashAlgorithm): string {
  return HASHERS[algorithm](text).toString(CryptoJS.enc.Hex);
}
