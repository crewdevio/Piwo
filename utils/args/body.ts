/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { dontNeedToBeMutated, equal, readBody } from "./regex.ts";
import { formData } from "../formData.ts";
import { errors } from "../output/errors.ts";
import Output from "../output/output.ts";

export default class Body {
  static parseToJSON(body: string[]) {
    const stringified = `{${body.map(replace).join(", ")}}`;

    try {
      return JSON.parse(stringified);
    } catch {
      Output.error(errors.invalid);
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
