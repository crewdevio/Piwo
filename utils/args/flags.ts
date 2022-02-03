/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default class Flags {
  static parse(flag: string) {
    const replace: Record<string, string> = {
      "--": "",
      "-": "",
      "h": "help",
      "v": "version",
      "f": "form",
    } as const;

    return flag.replace(/^\--|^\-|[a-z-]+/g, (match) => {
      if (Object.hasOwn(replace, match)) {
        return replace[match];
      }
      return match;
    });
  }
}
