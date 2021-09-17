/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { dontNeedToBeMutated, equal, readBody } from "./regex.ts";
import { red } from "../color/colors.ts";
import { formData } from "../formData.ts";

export default class Body {
  static parseToJSON(body: string[]) {
    const stringified = `{${body.map(replace).join(", ")}}`;

    try {
      return JSON.parse(stringified);
    } catch {
      console.error(`${red("error")}: invalid body or input`);
      Deno.exit();
    }
  }

  static parseToFormData(body: string[]) {
    const json = this.parseToJSON(body);
    return formData(json);
  }
}

function replace(s: string) {
  return s.replace(readBody, (match) => {
    if (dontNeedToBeMutated.test(match)) return match;
    if (equal.test(match)) return `: `;

    return `"${match}"`;
  });
}
