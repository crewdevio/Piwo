/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  ArgsType,
  Command,
  Flag,
  Method,
  RequestArgs,
} from "../../types.ts";
import { errors, suggestions } from "../output/errors.ts";
import { args } from "../../regex.ts";
import Output from "../output/output.ts";
import Flags from "./flags.ts";
import Body from "./body.ts";

const { flags, method, url } = args;

export default function parse(args: string[]): ArgsType | void {
  if (!args.length) return;

  const flag = parseToFlag(args);

  if (flag) {
    return {
      data: flag,
      type: "flag",
    };
  }

  const command = parseToCommand(args);

  if (command) {
    return {
      data: command,
      type: "command",
    };
  }

  const request = parseToRequestArgs(args);

  if (request) {
    return {
      data: request,
      type: "request",
    };
  }
}

function parseToCommand(args: string[]): Command | void {
  if (args.at(0) === "run") {
    const { missing, toManyAliases } = errors.command.run;

    if (args.length < 2) Output.error(missing, suggestions.command.run.usage);
    if (args.length > 2) Output.error(toManyAliases);

    return {
      command: "run",
      body: args.at(1) as string,
    };
  }
}

function parseToFlag(args: string[]): Flag | void {
  if (args.at(0)?.match(flags.noArgs)) {
    if (args.length > 1) {
      Output.error(errors.flag.toManyArgs(args.at(0) as string));
    }

    return {
      flags: {
        [Flags.parse(args.at(0) as string)]: true,
      },
    };
  }
}

function parseToRequestArgs(args: string[]): RequestArgs | void {
  const body: string[] = [];

  const data: RequestArgs = {
    method: "GET",
    url: "",
  };

  args.forEach((arg) => {
    if (arg.match(method)) {
      data.method = arg as Method;
    } else if (arg.match(flags.form)) {
      data.flags = { form: true };
    } else if (arg.match(url) && !data.url) {
      data.url = arg;
    } else {
      body.push(arg);
    }
  });

  if (body.length) {
    const form = data.flags?.form;
    data.body = form ? Body.parseToFormData(body) : Body.parseToJSON(body);
    data.headers = !form ? { "content-type": "application/json" } : undefined;
  }

  if (!data.url) {
    Output.error(errors.request.missUrl, suggestions.request.usage);
  }

  return data;
}
