/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { CustomHeaders, Output } from "../../types.ts";
import { bold } from "fmt/colors.ts";
import { isJson } from "../validate.ts";
import regex from "./regex.ts";
import {
  blue,
  keyColor,
  nullColor,
  numberAndBoolColor,
  purple,
  red,
  stringColor,
  yellow,
} from "./colors.ts";

function colorizeData({ protocol, status, ok, headers, body }: Output) {
  return {
    protocol: purple(protocol),
    status: colorizeStatus(status),
    ok: ok ? blue("OK") : red("ERROR"),
    headers: colorizeHeader(headers),
    body: isJson(JSON.stringify(body)) ? colorizeJson(body!) : body,
  };
}

function colorizeStatus(status: number) {
  return status >= 400
    ? red(status)
    : status < 300
    ? blue(status)
    : yellow(status);
}

function colorizeHeader(headers: CustomHeaders) {
  let colorized = "";
  for (const key in headers) {
    colorized += `${purple(key)}: ${headers[key]}\n`;
  }
  return colorized;
}

function colorizeJson(body: string | Record<string, unknown>) {
  const json = JSON.stringify(body, null, 2);

  return json.replace(regex.json, (match) => {
    if (regex.string.test(match)) {
      if (regex.key.test(match)) {
        return bold(keyColor(match.slice(0, -1))) + ":";
      }
      return stringColor(match);
    }
    if (regex.null.test(match)) return nullColor(match);

    return numberAndBoolColor(match);
  });
}

export default colorizeData;
