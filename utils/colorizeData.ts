/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { CustomHeaders, Output } from "../types.ts";
import {
  blue,
  keyColor,
  nullColor,
  purple,
  red,
  stringColor,
  yellow,
	numberAndBoolColor,
} from "./colors.ts";
import { bold } from "fmt/colors.ts";
import { isJson } from "./validate.ts"

function colorizeData({ protocol, status, ok, headers, body }: Output) {
  return {
    protocol: purple(protocol),
    status: status >= 400
      ? red(status)
      : status <= 299
      ? blue(status)
      : yellow(status),
    ok: ok ? blue("OK") : red("ERROR"),
    headers: colorizeHeader(headers),
    body: isJson(JSON.stringify(body)) ? colorizeJson(body!) : body,
  };
}

function colorizeHeader(headers: CustomHeaders) {
  let colorized = "";
  for (const key in headers) {
    colorized += `${purple(key)}: ${headers[key]}\n`;
  }
  return colorized;
}

function colorizeJson(body: string | Record<string, unknown>) {
	const jsonRegex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
  const json = JSON.stringify(body, null, 2);

  return json.replace(jsonRegex, match => {
		if (/^"/.test(match)) {
			if (/:$/.test(match)) {
				return bold(keyColor(match.slice(0, -1))) + ":";
			}
			return stringColor(match);
		}
		if (/null/.test(match)) return nullColor(match);

		return numberAndBoolColor(match);
	});
}

export default colorizeData;
