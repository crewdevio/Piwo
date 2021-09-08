/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import helpCommand from "./commands/help.ts";
import versionCommand from "./commands/version.ts";
import parse from "./utils/args/parser.ts";
import output from "./utils/output/output.ts";
import customFetch from "./utils/customFetch.ts";

const denoArgs = Deno.args;
const args = parse(denoArgs);

console.log(denoArgs);
console.log(args);

if (args) {
  const { flags } = args;

  if (flags.help) {
    console.log(helpCommand);
  } else if (flags.version) {
    console.log(versionCommand);
  } else {
    output(await customFetch(args));
  }
}
else console.log(helpCommand);
