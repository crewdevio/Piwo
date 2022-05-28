/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fetchFromArgs, fetchFromRequestFile } from "./utils/request/fetch.ts";
import { runCommandFilePath } from "./info.ts";
import { getRequest } from "./utils/request/getRequest.ts";
import versionCommand from "./commands/version.ts";
import helpCommand from "./commands/help.ts";
import Output from "./utils/output/output.ts";
import parse from "./utils/args/parser.ts";

const args = parse(Deno.args);

if (args) {
  const { type, data } = args;

  if (type === "flag")
    console.log(data.flags.version ? versionCommand : helpCommand);

  if (type === "command" && data.command === "run") {
    const alias = data.body;
    const request = await getRequest(alias, runCommandFilePath);
    Output.response(await fetchFromRequestFile(request.url, request));
  }

  if (type === "request") Output.response(await fetchFromArgs(data));
} else console.log(helpCommand);
