/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Args, Method } from "../../types.ts";
import { isEmpty, isFormDataEmpty } from "../object/isEmpty.ts";
import { error, warn } from "../output/fail.ts";
import { args } from "../../regex.ts";
import Flags from "./flags.ts";
import Body from "./body.ts";

const { flag, method, url } = args;

function parse(args: string[]) {
  if (!args.length) return;

  const obj: Args = {};
  const body: string[] = [];

  args.forEach((arg) => {
    if (arg.match(method)) {
      obj.method = arg as Method;
    } else if (arg.match(flag)) {
      obj.flags ??= {};
      obj.flags[Flags.parse(arg)] = true;
    } else if (arg.match(url) && !obj.url) {
      obj.url = arg;
    } else {
      body.push(arg);
    }
  });

  if (body.length) {
    const form = obj.flags?.form;
    obj.body = form ? Body.parseToFormData(body) : Body.parseToJSON(body);
    obj.headers = !form ? { "Content-Type": "application/json" } : undefined;
  }

  if (obj.url) {
    obj.method ??= "GET";
  }

  return obj as Required<Args>;
}

// TODO: Make this code more readable
function validate(args: Required<Args>) {
  const { method, url, flags } = args;
  let { body } = args;

  const pass = Flags.validate(args);
  if (!pass || flags.version) return;

  if (!method) {
    error("[METHOD]");
    Deno.exit();
  }
  if (!url) {
    error("[URL]");
    Deno.exit();
  }
  if (method !== "GET" && method !== "DELETE") {
    if (flags?.form) {
      if (isFormDataEmpty(body as FormData)) {
        warn("[BODY]");
        body = "";
      }
    } else {
      if (isEmpty(body as Record<string, unknown>)) {
        warn("[BODY]");
        body = "";
      }
    }
  }
}

export default parse;
