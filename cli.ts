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

const args = parse(Deno.args, { stopEarly: true, boolean: true });

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
    output({ method, url, body, flags })
  }
} else {
  console.log(helpCommand);
}
