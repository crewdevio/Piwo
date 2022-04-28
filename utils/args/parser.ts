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
import { args } from "../../regex.ts";
import { purple, yellow } from "../color/colors.ts";
import Flags from "./flags.ts";
import Body from "./body.ts";
import Output from "../output/output.ts";

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
    const suggest = Output.example(`run ${yellow("[ALIAS]")}`);
    if (args.length === 2) {
      return {
        command: "run",
        body: args.at(1) as string,
      };
    }

    if (args.length < 2) {
      const error = Output.error(
        `command ${purple("run")} expect a alias from ${
          yellow(
            "request.json",
          )
        } file as argument`,
      );
      console.log(error + "\n");
      console.log(suggest);
      Deno.exit();
    }
    const error = Output.error("to many arguments");
    console.log(error + "\n");
    console.log(suggest);
    Deno.exit();
  }
}

function parseToFlag(args: string[]): Flag | void {
  if (args.at(0)?.match(flags.noArgs)) {
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

  return data;
}
