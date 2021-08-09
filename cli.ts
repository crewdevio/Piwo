/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Args } from "./types.ts";
import Flags from "./utils/args/flags.ts";
import makeRequired from "./utils/args/makeRequired.ts";
import helpCommand from "./commands/help.ts";
import versionCommand from "./commands/version.ts";
import parse from "./utils/args/parser.ts";
import output from "./utils/output/output.ts";
import customFetch from "./utils/customFetch.ts";

const denoArgs = Deno.args;
const args = parse(denoArgs);

console.log(args);

const flagValidation = Flags.validate(args);

if (args && !flagValidation?.error) {
  const { flags } = args as Args;

  if (flags?.help) {
    console.log(helpCommand);
  } else if (flags?.version) {
    console.log(versionCommand);
  } else {
    const fullArgs = makeRequired(args);
    const response = await customFetch(fullArgs);
    output(response);
  }
}

if (!args) console.log(helpCommand);
