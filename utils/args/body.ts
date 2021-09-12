/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { body as rgxBody, dontNeedToBeMutated, readBody } from "../../regex.ts";

export default class Body {
  static parseToJSON(body: string[]) {
    const stringified = `{${body.map(replace).join(", ")}}`;

    return JSON.parse(stringified);
  }

  static parseToFormData(body: string[]) {
    const fd = new FormData();
    const json = this.parseToJSON(body);

    Object.keys(json).map((key: string) => fd.append(key, json[key]));

    return fd;
  }
}

function replace(s: string) {
  const { equal } = rgxBody;

  return s.replace(readBody, (match) => {
    if (dontNeedToBeMutated.test(match)) return match;
    if (equal.test(match)) return `: `;

    return `"${match}"`;
  });
}
