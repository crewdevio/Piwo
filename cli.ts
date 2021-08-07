/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Args } from "./types.ts";
import Flags from "./utils/args/flags.ts";
import { output } from "./commands/httpRequest.ts";
import helpCommand from "./commands/help.ts";
import versionCommand from "./commands/version.ts";
import parse from "./utils/args/parser.ts";

const denoArgs = Deno.args;
const args = parse(denoArgs);

const flagValidation = Flags.validate(args);

if (denoArgs?.length && !flagValidation?.error) {
  const { method, url, body, flags } = args as Args;

  if (flags?.help) {
    console.log(helpCommand);
  } else if (flags?.version) {
    console.log(versionCommand);
  } else {
    const config = {
      method,
      url,
      body,
      flags,
    };
    output(config);
  }
}
if (!denoArgs?.length) {
  console.log(helpCommand);
}

if (flagValidation) {
  console.error(flagValidation?.msg);
}
