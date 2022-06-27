import { exists, readJson } from "tools-fs";
import { formData } from "../formData.ts";
import { errors } from "../output/errors.ts";
import Output from "../output/output.ts";

interface RequestFileItem extends Omit<RequestInit, "body"> {
  url: string;
  body?: Record<string, unknown> | string | FormData;
  headers?: Record<string, string>;
}

type RequestFile = Record<string, RequestFileItem>;

export async function getRequest(alias: string, filePath: string) {
  if (!(await exists(filePath))) Output.error(errors.fileNotFound(filePath));

  const json = (await readJson(filePath)) as RequestFile;
  const data = json[alias];

  if (!data) Output.error(errors.command.run.notFound(alias));

  const body = data.body;
  const headers = data.headers;

  if (body) {
    const contentType = headers?.["Content-Type"] ?? headers?.["content-type"];
    const formRegex = /application\/x-www-form-urlencoded|multipart\/form-data/;

    const isObject = typeof body === "object";

    if (contentType?.match("application/json")) {
      if (!isObject) Output.error(errors.request.body.json.invalid);

      data.body = JSON.stringify(body);
    } else if (contentType?.match(formRegex)) {
      if (!isObject) Output.error(errors.request.body.json.invalid);

      data.body = formData(body as Record<string, unknown>);
    }
  }

  return new Request(data.url, data as RequestInit);
}
