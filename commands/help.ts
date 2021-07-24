/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { purple, yellow } from "../utils/colors.ts";
import info from "../info.ts";

export default
`${purple("USAGE:")}
  ${info.name.toLowerCase()} ${yellow("[OPTIONS] [METHOD] [URL] [BODY]")}

${purple("OPTIONS:")}
  ${yellow("--help, -h")}      show help info
  ${yellow("--version, -v")}   show version

${purple("METHOD:")}
  ${yellow("GET")}             default method when no method is passed
  ${yellow("POST")}
  ${yellow("PATCH")}
  ${yellow("PUT")}
  ${yellow("DELETE")}

${purple("URL:")}
  You can no specify the protocol.

${purple("BODY:")}
  piwo can only send a json body

${purple("EXAMPLE:")}
  piwo api.github.com`;