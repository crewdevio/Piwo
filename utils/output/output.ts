/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { OutputResponse } from "../../types.ts";
import { red, yellow } from "../color/colors.ts";
import colorizeData from "../color/colorize.ts";

class Output {
  static response(data: OutputResponse) {
    const { protocol, status, ok, headers, body } = colorizeData(data);

    const outputBody = body ? `\n${body}` : "";

    console.log(`${protocol} ${status}/${ok}\n${headers + outputBody}`);
  }

  static error(msg: string, suggestion?: string) {
    msg = `${red("error")}: ${msg}`;
    msg = suggestion ? `${msg}\n\n${suggestion}` : msg;

    console.error(msg);
    Deno.exit();
  }

  static warn(msg: string) {
    console.warn(`${yellow("warning")}: ${msg}`);
  }

  static example(args: string) {
    return `piwo ${args}`;
  }
}

export default Output;
