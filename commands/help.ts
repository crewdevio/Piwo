/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { purple, yellow } from "../utils/color/colors.ts";
import { name } from "../info.ts";

const cliName = name.toLowerCase();

export default `${purple("USAGE:")}
  ${cliName} ${yellow("[OPTIONS] [METHOD] [URL] [BODY]")}

${purple("OPTIONS:")}
  ${yellow("--help, -h")}      show help info
  ${yellow("--version, -v")}   show version
  ${yellow("--form, -f")}      send a body as form

${purple("METHOD:")}
  ${yellow("GET")}             default method when no method is passed
  ${yellow("POST")}
  ${yellow("PATCH")}
  ${yellow("PUT")}
  ${yellow("DELETE")}

${purple("URL:")}
  you can no specify the protocol.

${purple("BODY:")}
  send a body as JSON (default)

${purple("EXAMPLE:")}
  ${cliName} api.github.com`;
