import { red, yellow } from "./color/colors.ts";
import { runJson } from "../types.ts";

export async function readJson(filePath: string): Promise<unknown> {
  const decoder = new TextDecoder("utf-8");

  const content = decoder.decode(await Deno.readFile(filePath));

  try {
    return JSON.parse(content);
  } catch (err) {
    err.message = `${filePath}: ${err.message}`;
    throw err;
  }
}

export async function getRequest(alias: string, filePath: string) {
  const json = await readJson(filePath) as runJson;
  const request = json[alias];
  if (!request) {
    console.error(
      `${red("error")}: ${yellow(alias)} alias not found in ${
        yellow("request.json")
      }`,
    );
    Deno.exit();
  }

  if (request.body) {
    Object.defineProperty(request, "body", {
      value: JSON.stringify(request.body),
    });
  }

  return request;
}
