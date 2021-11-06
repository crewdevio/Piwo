import { join } from "path/mod.ts";
import * as fs from "fs/mod.ts";
import { cookiePath, storagePath } from "../../info.ts";

const { exists } = fs;
const { mkdir, writeFile, readFile } = Deno;

export function saveCookie(headers: Headers, url: string) {
  [storagePath, cookiePath].forEach(
    async (dir) => !(await exists(dir)) && (await mkdir(dir)),
  );

  const filePath = join(cookiePath, getURL(url));
  const encoder = new TextEncoder();

  ["set-cookie", "cookie"].forEach((v) => {
    if (headers.has(v)) {
      const cookie = headers.get(v) as string;
      const data = encoder.encode(cookie);
      writeFile(filePath, data);
    }
  });
}

export async function getCookie(url: string) {
  const path = join(cookiePath, getURL(url));
  if (await exists(path)) {
    const decoder = new TextDecoder("utf-8");
    const data = await readFile(path);

    return decoder.decode(data);
  }
}

function getURL(url: string) {
  const match = url.match(/[A-z0-9:.]+/g);
  const len = match?.length;
  return len === 1
    ? match?.[0]?.startsWith("www.") ? match?.slice(4) : match?.[0]
    : match?.[0].startsWith("http")
    ? match?.[1]
    : match?.[0];
}
