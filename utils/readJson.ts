import { red, yellow } from "./color/colors.ts";
import { formData } from "./formData.ts";
import { exists } from "fs/mod.ts";

export async function readJson(filePath: string) {
  if (!await exists(filePath)) {
    console.error(`${red("error")}: ${yellow(filePath)} not found`);
    Deno.exit();
  }

  try {
    const decoder = new TextDecoder("utf-8");
    const content = decoder.decode(await Deno.readFile(filePath));

    return JSON.parse(content);
  } catch (err) {
    err.message = `${filePath}: ${err.message}`;
    throw err;
  }
}

export async function getRequest(alias: string, filePath: string) {
  const json = await readJson(filePath);
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
    const { headers, body } = request;
    const contentType = headers?.["Content-Type"] || headers?.["content-type"];
    const formRegex = /application\/x-www-form-urlencoded|multipart\/form-data/;

    if (contentType?.match("application/json")) {
      request.body = JSON.stringify(body);
    } else if (contentType?.match(formRegex) || !contentType) {
      request.body = formData(body);
    }
  }

  return request;
}
