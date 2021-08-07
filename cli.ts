/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { parse } from "flags/mod.ts";
import handleArgs from "./handlers/handleArgs.ts";
import hasArgs from "./utils/hasArgs.ts";
import { output } from "./commands/httpRequest.ts";
import helpCommand from "./commands/help.ts"
import versionCommand from "./commands/version.ts"
// import parse from "./utils/args/parser.ts";

const args = parse(Deno.args, { stopEarly: true, boolean: true });
// console.log(parse(Deno.args));

if (hasArgs(args)) {
  const { method, url, body, flags } = handleArgs(args);

  if (flags.help) {
    console.log(helpCommand);
  } else if (flags.version) {
    console.log(versionCommand);
  } else {
    output({ method, url, body, flags })
  }
} else {
  console.log(helpCommand);
}
