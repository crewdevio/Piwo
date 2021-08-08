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
import { isEmpty } from "../object/isEmpty.ts"

function parse(args: string[]) {
  if (!args.length) return;

  const { flag, shortFlag, method, url } = regex;
  const flags: Record<string, true> = {};
  const parsedArgs: Args = {};
  const body: string[] = [];

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
    } else {
      body.push(arg);
    }
  });

  if (!isEmpty(flags)) parsedArgs.flags = Flags.parse(flags);

  if (body.length) {
    const form = parsedArgs.flags?.form;

    if (form) {
      parsedArgs.body = Body.parseToFormData(body);
    } else {
      parsedArgs.body = Body.parseToJSON(body);
    }
  }

  return parsedArgs;
}

export default parse;
