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
import { customFetch, runFetch } from "./utils/customFetch.ts";
import { validateArgs } from "./utils/args/validate.ts";
import { red, yellow } from "./utils/color/colors.ts";
import { runJson } from "./types.ts";
import { readJson } from "./utils/readJson.ts";

const denoArgs = Deno.args;
const args = parse(denoArgs);
const unexpect = args && validateArgs(args);

if (unexpect && unexpect.exit) {
  const { type, msg } = unexpect;

  console.error(`${type}: ${msg}`);
  Deno.exit();
}

if (args) {
  const { flags, command } = args;

  if (command) {
    const request = await readJson("./request.json") as runJson;
    const alias = request[command.split(" ")[1]];
    if (!alias) {
      console.error(
        `${red("error")}: ${yellow(alias)} alias not found in ${
          yellow("request.json")
        }`,
      );
      Deno.exit();
    }

    output(await runFetch(alias.url, alias));
  } else if (flags?.help) {
    console.log(helpCommand);
  } else if (flags?.version) {
    console.log(versionCommand);
  } else {
    output(await customFetch(args));
  }
} else console.log(helpCommand);

if (unexpect) {
  const { type, msg } = unexpect;
  console.error(`\n${type}: ${msg}`);
}
