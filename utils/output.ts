/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Output } from "../types.ts";
import colorizeData from "./color/colorize.ts";

function output(data: Output) {
  const { protocol, status, ok, headers, body } = colorizeData(data);

  const outputBody = body ? `\n${body}` : "";

  console.log(`${protocol} ${status}/${ok}\n${headers + outputBody}`);
}

export default output;
