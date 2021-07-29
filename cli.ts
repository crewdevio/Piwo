/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Commands } from "./types.ts";
import { parse } from "flags/mod.ts";
import handleArgs from "./handlers/handleArgs.ts";
import hasArgs from "./utils/hasArgs.ts";
import {
  deleteCommand,
  getCommand,
  postCommand,
  putCommand,
  patchCommnand
} from "./commands/httpRequest.ts";
import helpCommand from "./commands/help.ts"
import versionCommand from "./commands/version.ts"

const commands: Commands = {
  GET: getCommand,
  POST: postCommand,
  PUT: putCommand,
  DELETE: deleteCommand,
  PATCH: patchCommnand
};

const args = parse(Deno.args, { stopEarly: true });

if (hasArgs(args)) {
  const { method, url, body, flags } = handleArgs(args);

  try {
    console.log(JSON.parse(body as string));
  } catch {
    console.log(body);
  }

  if (flags.help) {
    console.log(helpCommand);
  } else if (flags.version) {
    console.log(versionCommand);
  } else {
    commands[method](url, body);
  }
} else {
  console.log(helpCommand);
}
