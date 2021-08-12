/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Args, Method } from "../../types.ts";
import Flags from "./flags.ts";
import regex from "./regex.ts";
import Body from "./body.ts";
import { error, warn } from "../output/fail.ts";
import { isEmpty, isFormDataEmpty } from "../object/isEmpty.ts";

function parse(args: string[]) {
  if (!args.length) return;

  const { flag, shortFlag, method, url } = regex;
  const flags: Record<string, true> = {};
  const body: string[] = [];
  const parsedArgs: Args = {}

  args.forEach((arg) => {
    if (flag.test(arg)) {
      flags[arg.slice(1)] = true;
    } else if (shortFlag.test(arg)) {
      flags[arg.slice(2)] = true;
    } else if (method.test(arg)) {
      parsedArgs.method = arg as Method;
    } else if (url.test(arg) && !parsedArgs.url) {
      parsedArgs.url = arg;
      parsedArgs.method ??= "GET";

      if (arg.includes("localhost") && !arg.includes("http")) {
        parsedArgs.url = "http://" + arg;
      }
    } else {
      body.push(arg);
    }
  });

  parsedArgs.flags = Flags.parse(flags);

  parsedArgs.headers = {
    "Content-Type": "application/json",
  };

  if (body.length) {
    const form = parsedArgs.flags?.form;

    if (form) {
      parsedArgs.body = Body.parseToFormData(body);
      parsedArgs.headers = undefined;
    } else {
      parsedArgs.body = Body.parseToJSON(body);
    }
  }

  const result = parsedArgs as Required<Args>;

  validate(result);
  return result;
}

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
  if (method !== "GET") {
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
