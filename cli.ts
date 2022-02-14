/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import helpCommand from "./commands/help.ts";
import versionCommand from "./commands/version.ts";
import parse from "./utils/args/parser.ts";
import output from "./utils/output/output.ts";
import { fetchFromArgs, fetchFromRequestFile } from "./utils/request/fetch.ts";
import { getRequest } from "./utils/readJson.ts";
import { runCommandFilePath } from "./info.ts";

const denoArgs = Deno.args;
const args = parse(denoArgs);

if (args) {
  const { type } = args;

  if (type === "flag") {
    const { flags } = args.data;
    console.log(flags.version ? versionCommand : helpCommand);
  }

  if (type === "command") {
    const { command } = args.data;
    if (command === "run") {
      const alias = args.data.body;
      const request = await getRequest(alias, runCommandFilePath);
      output(await fetchFromRequestFile(request.url, request));
    }
  }

  if (type === "request") {
    output(await fetchFromArgs(args.data));
  }
} else console.log(helpCommand);
